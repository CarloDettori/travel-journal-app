

import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext.jsx";
import MomentCardComponent from "./MomentCardComponent.jsx";


export default function MomentFilterComponent() {

    const { id } = useParams()

    const { trips, setTrips } = useContext(GlobalContext)

    const trip = trips?.find((trip) => trip.id.toString() === id)
    const step = trip?.steps.find((step) => step.stepId.toString() === id)
    const event = step?.events.find((event) => event.eventId.toString() === id)
    const moments = event?.moments || [];
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


    const filteredMoments = useMemo(() => {
        if (!moments) return [];


        let filtered = [...moments];

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


        ;

        return filtered;
    }, [moments, searchQuery, selectValue, sortBy, sortOrder]);

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
                        <strong>Cerca un momento</strong>
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
            {filteredMoments.length !== 0 ? (
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
                        {filteredMoments.map((moment) => (
                            <MomentCardComponent
                                moment={moment}
                                key={moment.momentId}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <p>
                    <strong>nessun momento trovato</strong>
                </p>
            )}
        </>
    );
}
