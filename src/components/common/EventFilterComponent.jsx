import { useState, useMemo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext.jsx";
import EventCardComponent from "./EventCardComponent.jsx";

export default function EventFilterComponent() {
    const { tripId, stepId } = useParams();
    const { trips } = useContext(GlobalContext);

    // Recupera eventi della tappa
    const step = trips
        ?.find((trip) => trip.tripId === Number(tripId))
        ?.steps.find((step) => step.stepId === Number(stepId));
    const events = step?.events || [];

    const [searchQuery, setSearchQuery] = useState("");
    const [selectValue, setSelectValue] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState(1);
    const [moods, setMoods] = useState([]);

    // Estrai mood disponibili
    useEffect(() => {
        if (!events) return;
        const uniqueMoods = [];
        events.forEach((event) => {
            (event.mood || []).forEach((mood) => {
                if (!uniqueMoods.includes(mood)) {
                    uniqueMoods.push(mood);
                }
            });
        });
        setMoods(uniqueMoods);
    }, [events]);

    // Debounce
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

    // Filtraggio e ordinamento
    const filteredEvents = useMemo(() => {
        if (!events) return [];

        let filtered = [...events];

        // Filtro per mood
        if (selectValue.trim() !== "" && selectValue.trim() !== "-") {
            filtered = filtered.filter((event) =>
                (event.mood || []).some((mood) =>
                    mood.toLowerCase().includes(selectValue.trim().toLowerCase())
                )
            );
        }

        // Filtro per titolo
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((event) =>
                event.eventTitle?.toLowerCase().includes(searchQuery.trim().toLowerCase())
            );
        }

        // Ordinamento
        filtered.sort((a, b) => {
            let result = 0;
            if (sortBy === "title") {
                result = a.eventTitle.localeCompare(b.eventTitle);
            } else if (sortBy === "mood") {
                const moodA = (a.mood || []).join(" ").toLowerCase();
                const moodB = (b.mood || []).join(" ").toLowerCase();
                result = moodA.localeCompare(moodB);
            }
            return result * sortOrder;
        });

        return filtered;
    }, [events, searchQuery, selectValue, sortBy, sortOrder]);

    return (
        <>
            {/* Filtro testo */}
            <div className="pb-3">
                <label><strong>Cerca un evento</strong></label>
                <input
                    type="text"
                    className="bg-[#4a5566] block w-full p-2 text-white rounded-lg text-xs"
                    placeholder="Cerca un evento..."
                    onChange={handleFilter}
                />
            </div>

            {/* Filtro mood */}
            <div className="pb-10">
                <label><strong>Filtro per vibe</strong></label>
                <select
                    className="w-full bg-[#4a5566] p-2 text-white rounded-lg text-xs"
                    onChange={handleFilter}
                >
                    <option value="">Nessuno</option>
                    {moods.map((mood) => (
                        <option key={mood} value={mood}>{mood}</option>
                    ))}
                </select>
            </div>

            {/* Ordinamento */}
            <div className="pt-3 text-end">
                <p className="flex justify-between">
                    <strong style={{ cursor: "pointer" }} onClick={() => handleSort("title")}>
                        TITOLO {sortBy === "title" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                    </strong>
                    <strong style={{ cursor: "pointer" }} onClick={() => handleSort("mood")}>
                        {sortBy === "mood" ? (sortOrder === 1 ? "▲" : "▼") : ""} VIBE
                    </strong>
                </p>
            </div>

            {/* Lista eventi */}
            <div className="w-200 mx-auto">
                {filteredEvents.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {filteredEvents.map((event) => (
                            <EventCardComponent
                                key={event.eventId}
                                event={event}
                                stepId={stepId}
                                tripId={tripId}
                            />
                        ))}
                    </div>
                ) : (
                    <p><strong>Nessun evento trovato</strong></p>
                )}
            </div>
        </>
    );
}

