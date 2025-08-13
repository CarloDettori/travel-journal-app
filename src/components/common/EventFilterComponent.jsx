

import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext.jsx"
import EventCardComponent from "./EventCardComponent.jsx";

export default function EventFilterComponent({ events }) {
    const { tripId, stepId } = useParams()

    const { trips, setTrips } = useContext(GlobalContext)

    const trip = trips?.find((trip) => trip.tripId === Number(tripId))
    const step = trip?.steps.find((step) => step.stepId === Number(stepId))
    //const events = step?.events || [];
    //console.log(events)

    const [searchQuery, setSearchQuery] = useState("");
    const [selectValue, setSelectValue] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState(1);

    function debounce(callback, delay) {
        let timer;
        return (event) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                callback(event);
            }, delay);
        };
    }

    const handleFilter = useCallback(
        debounce((event) => {
            const { value, type } = event.target;
            if (type === "text") {
                setSearchQuery(value);
            } else {
                setSelectValue(value);
            }
        }, 500),
        []
    );

    const handleSort = useCallback(
        (column) => {
            if (sortBy === column) {
                setSortOrder((prev) => prev * -1);
            } else {
                setSortBy(column);
                setSortOrder(1);
            }
        },
        [sortBy]
    );


    const filteredEvents = useMemo(() => {
        if (!events) return [];


        let filtered = [...events];

        // Filtro per tag


        // Filtro per titolo
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((trip) =>
                trip.tripTitle
                    ?.toLowerCase()
                    .includes(searchQuery.trim().toLowerCase())
            );
        }

        // Ordinamento
        filtered.sort((a, b) => {
            let result = 0;

            if (sortBy === "title") {
                // Ordinamento per titolo
                result = a.tripTitle.localeCompare(b.tripTitle);
            } else if (sortBy === "tags") {
                // Estrae tutti i tag, li unisce in una stringa in minuscolo
                const tagsA = (a.steps || [])
                    .flatMap(step => step.events || [])
                    .flatMap(event => event.moments || [])
                    .flatMap(moment => moment.tags || [])
                    .map(tag => tag.toLowerCase())
                    .join(" ");

                const tagsB = (b.steps || [])
                    .flatMap(step => step.events || [])
                    .flatMap(event => event.moments || [])
                    .flatMap(moment => moment.tags || [])
                    .map(tag => tag.toLowerCase())
                    .join(" ");

                result = tagsA.localeCompare(tagsB);
            }

            return result * sortOrder;
        });

        ;

        return filtered;
    }, [events, searchQuery, selectValue, sortBy, sortOrder]);

    //console.log(filteredSteps)

    return (
        <>
            <div className="w-full">
                {/* Filtro testo */}
                <div className="pb-3">
                    <label
                        htmlFor="small-input"
                        className="block mb-2 font-normal"
                    >
                        <strong>Cerca una tappa</strong>
                    </label>
                    <input
                        type="text"
                        id="small-input"
                        className="bg-[#4a5566] block w-full p-2 text-white shadow-md rounded-lg text-xs"
                        placeholder="Cerca un viaggio"
                        onChange={handleFilter}
                    />
                </div>
            </div>
            {filteredEvents.length !== 0 ? (
                <>
                    <div className="flex flex-col gap-4 flex-wrap">


                        {/* Ordinamento */}
                        <div className="pt-3 text-end">
                            <p className="flex justify-between">
                                <strong
                                    className="text-start"
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleSort("title")}
                                >
                                    TITOLO{" "}
                                    {sortBy === "title"
                                        ? sortOrder === 1
                                            ? "▲"
                                            : "▼"
                                        : ""}
                                </strong>
                                <strong
                                    style={{ cursor: "pointer" }}
                                    onClick={() => handleSort("tags")}
                                >
                                    {sortBy === "tags"
                                        ? sortOrder === 1
                                            ? "▲"
                                            : "▼"
                                        : ""}{" "}
                                    TAG
                                </strong>
                            </p>
                        </div>

                        {/* Lista viaggi */}
                        {filteredEvents.map((event) => (
                            <EventCardComponent
                                key={event.eventId}
                                event={event}
                                stepId={step.stepid}
                                tripId={trip.tripId}

                            />
                        ))}
                    </div>
                </>
            ) : (
                <p>
                    <strong>nessun evento trovato</strong>
                </p>
            )}
        </>
    );
}
