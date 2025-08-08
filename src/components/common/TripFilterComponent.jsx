

import { useState, useMemo, useEffect, useCallback } from "react";
import TripCardComponent from "./TripCardComponent.jsx";

export default function TripFilterComponent({ trips }) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectValue, setSelectValue] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState(1);
    const [tags, setTags] = useState([]);
    console.log(trips)
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

    const filteredTrips = useMemo(() => {
        if (!trips) return [];

        console.log("=== DEBUG FILTRI ===");
        console.log("Viaggi iniziali:", trips);

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
            console.log(`Dopo filtro per tag "${selectValue}":`, filtered);
        }

        // Filtro per titolo
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((trip) =>
                trip.tripTitle
                    ?.toLowerCase()
                    .includes(searchQuery.trim().toLowerCase())
            );
            console.log(`Dopo filtro per titolo "${searchQuery}":`, filtered);
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

        console.log("Risultato finale:", filtered);

        return filtered;
    }, [trips, searchQuery, selectValue, sortBy, sortOrder]);

    console.log(filteredTrips)

    return (
        <section className="w-full">
            <h1 className="pb-5 text-center">I TUOI VIAGGI</h1>
            <div className="grid gap-6 mb-3 md:grid-cols-2 ">
                {/* Filtro testo */}
                <div className="pb-10">
                    <label
                        htmlFor="small-input"
                        className="block mb-2 font-normal arcadefont"
                    >
                        <strong>Cerca un viaggio</strong>
                    </label>
                    <input
                        type="text"
                        id="small-input"
                        className="bg-[#4a5566] block w-full p-2 text-white shadow-md rounded-lg text-xs"
                        placeholder="Cerca un viaggio..."
                        onChange={handleFilter}
                    />
                </div>

                {/* Filtro tag */}
                <div className="pb-10">
                    <label
                        htmlFor="tag-filter"
                        className="block mb-2 font-normal arcadefont"
                    >
                        <strong>Filtro per tag</strong>
                    </label>
                    <select
                        id="tag-filter"
                        className="block w-full bg-[#4a5566] p-2 text-white shadow-md rounded-lg text-xs"
                        onChange={handleFilter}
                    >
                        <option value="">Nessuno</option>
                        {tags.map((tag) => (
                            <option key={tag} value={tag}>
                                {tag}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            {filteredTrips.length !== 0 ? (
                <>
                    <div className="flex flex-col gap-4 flex-wrap">


                        {/* Ordinamento */}
                        <div className="pb-3 text-end">
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
                        {filteredTrips.map((trip) => (
                            <TripCardComponent
                                key={trip.id}
                                id={trip.id}
                                trip={trip}
                            />
                        ))}
                    </div>
                </>
            ) : (
                <p>
                    <strong>nessun viaggio trovato</strong>
                </p>
            )}
        </section>
    );
}
