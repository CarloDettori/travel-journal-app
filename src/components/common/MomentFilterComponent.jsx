import { useState, useMemo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext.jsx";
import MomentCardComponent from "./MomentCardComponent.jsx";

export default function MomentFilterComponent() {
    const { tripId, stepId, eventId } = useParams();
    const { trips } = useContext(GlobalContext);

    // Recupera momenti dall'evento
    const event = trips
        ?.find((trip) => trip.tripId === Number(tripId))
        ?.steps.find((step) => step.stepId === Number(stepId))
        ?.events.find((event) => event.eventId === Number(eventId));

    const moments = event?.moments || [];

    const [searchQuery, setSearchQuery] = useState("");
    const [selectValue, setSelectValue] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState(1);
    const [tags, setTags] = useState([]);

    // Estrai tag disponibili
    useEffect(() => {
        if (!moments) return;
        const uniqueTags = [];
        moments.forEach((moment) => {
            moment.tags?.forEach((tag) => {
                if (!uniqueTags.includes(tag)) {
                    uniqueTags.push(tag);
                }
            });
        });
        setTags(uniqueTags);
    }, [moments]);

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
    const filteredMoments = useMemo(() => {
        if (!moments) return [];

        let filtered = [...moments];

        // Filtro per tag
        if (selectValue.trim() !== "" && selectValue.trim() !== "-") {
            filtered = filtered.filter((moment) =>
                moment.tags?.some((tag) =>
                    tag.toLowerCase().includes(selectValue.trim().toLowerCase())
                )
            );
        }

        // Filtro per descrizione
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((moment) =>
                moment.momentDescription?.toLowerCase().includes(searchQuery.trim().toLowerCase())
            );
        }

        // Ordinamento
        filtered.sort((a, b) => {
            let result = 0;
            if (sortBy === "description") {
                result = a.momentDescription.localeCompare(b.momentDescription);
            } else if (sortBy === "tags") {
                const tagsA = (a.tags || []).join(" ").toLowerCase();
                const tagsB = (b.tags || []).join(" ").toLowerCase();
                result = tagsA.localeCompare(tagsB);
            }
            return result * sortOrder;
        });

        return filtered;
    }, [moments, searchQuery, selectValue, sortBy, sortOrder]);

    return (
        <>
            {/* Filtro testo */}
            <div className="pb-3">
                <label><strong>Cerca un momento</strong></label>
                <input
                    type="text"
                    className="bg-[#4a5566] block w-full p-2 text-white rounded-lg text-xs"
                    placeholder="Cerca un momento..."
                    onChange={handleFilter}
                />
            </div>

            {/* Filtro tag */}
            <div className="pb-10">
                <label><strong>Filtro per tag</strong></label>
                <select
                    className="w-full bg-[#4a5566] p-2 text-white rounded-lg text-xs"
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
                    <strong style={{ cursor: "pointer" }} onClick={() => handleSort("description")}>
                        DESCRIZIONE {sortBy === "description" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                    </strong>
                    <strong style={{ cursor: "pointer" }} onClick={() => handleSort("tags")}>
                        {sortBy === "tags" ? (sortOrder === 1 ? "▲" : "▼") : ""} TAG
                    </strong>
                </p>
            </div>

            {/* Lista momenti */}
            {filteredMoments.length > 0 ? (
                filteredMoments.map((moment) => (
                    <MomentCardComponent key={moment.momentId} moment={moment} />
                ))
            ) : (
                <p><strong>Nessun momento trovato</strong></p>
            )}
        </>
    );
}
