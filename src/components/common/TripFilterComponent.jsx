import { useState, useMemo, useEffect, useCallback } from "react";
import TripCardComponent from "./TripCardComponent.jsx";

export default function TripFilterComponent({ trips }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectValue, setSelectValue] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState(1);
    const [tags, setTags] = useState([]);

    // Estrai tutti i tag disponibili dai viaggi
    useEffect(() => {
        if (!trips) return;
        const uniqueTags = [];
        trips.forEach((trip) => {
            trip.steps?.forEach((step) => {
                step.events?.forEach((event) => {
                    event.moments?.forEach((moment) => {
                        moment.tags?.forEach((tag) => {
                            if (!uniqueTags.includes(tag)) {
                                uniqueTags.push(tag);
                            }
                        });
                    });
                });
            });
        });
        setTags(uniqueTags);
    }, [trips]);

    // Debounce input
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
    const filteredTrips = useMemo(() => {
        if (!trips) return [];

        let filtered = [...trips];

        // Filtro per tag
        if (selectValue.trim() !== "" && selectValue.trim() !== "-") {
            filtered = filtered.filter((trip) =>
                trip.steps?.some((step) =>
                    step.events?.some((event) =>
                        event.moments?.some((moment) =>
                            moment.tags?.some((tag) =>
                                tag
                                    .toLowerCase()
                                    .includes(selectValue.trim().toLowerCase())
                            )
                        )
                    )
                )
            );
        }

        // Filtro per titolo
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((trip) =>
                trip.tripTitle?.toLowerCase().includes(searchQuery.trim().toLowerCase())
            );
        }

        // Ordinamento
        filtered.sort((a, b) => {
            let result = 0;
            if (sortBy === "title") {
                result = a.tripTitle.localeCompare(b.tripTitle);
            } else if (sortBy === "price") {
                result = a.price - b.price;
            }
            return result * sortOrder;
        });

        return filtered;
    }, [trips, searchQuery, selectValue, sortBy, sortOrder]);

    return (
        <section>
            {/* Filtro testo */}
            <div className="pb-3">
                <label><strong>Cerca un viaggio</strong></label>
                <input
                    type="text"
                    className="bg-[#4a5566] block w-full p-2 text-white rounded-lg text-xs"
                    placeholder="Cerca un viaggio..."
                    onChange={handleFilter}
                />
            </div>

            {/* Filtro tag */}
            <div className="pb-10">
                <label><strong>Filtro per tag</strong></label>
                <select
                    className="bg-[#4a5566] w-full p-2 text-white rounded-lg text-xs"
                    onChange={handleFilter}
                >
                    <option value="">Nessuno</option>
                    {tags.map((tag) => (
                        <option key={tag} value={tag}>{tag}</option>
                    ))}
                </select>
            </div>

            {/* Ordinamento */}
            <div className="pt-3 text-end">
                <p className="flex justify-between">
                    <strong style={{ cursor: "pointer" }} onClick={() => handleSort("title")}>
                        TITOLO {sortBy === "title" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                    </strong>
                    <strong style={{ cursor: "pointer" }} onClick={() => handleSort("price")}>
                        {sortBy === "price" ? (sortOrder === 1 ? "▲" : "▼") : ""} PREZZO
                    </strong>
                </p>
            </div>

            {/* Lista viaggi */}
            {filteredTrips.length > 0 ? (
                <div className="flex flex-col gap-3">
                    {filteredTrips.map((trip) => (
                        <TripCardComponent key={trip.tripId} trip={trip} />
                    ))}
                </div>
            ) : (
                <p><strong>Nessun viaggio trovato</strong></p>
            )}

        </section>
    );
}


