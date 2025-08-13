import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../../context/GlobalContext.jsx";
import StepCardComponent from "./StepCardComponent.jsx";

export default function StepFilterComponent() {
    const { tripId } = useParams();
    const { trips } = useContext(GlobalContext);

    // Trova il viaggio corrispondente
    const steps = trips.find((trip) => trip.tripId === Number(tripId))?.steps || [];

    const [searchQuery, setSearchQuery] = useState("");
    const [selectValue, setSelectValue] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState(1);
    const [tags, setTags] = useState([]);

    // Estrai tutti i tag disponibili
    useEffect(() => {
        if (!steps) return;
        const uniqueTags = [];
        steps.forEach((step) => {
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
        setTags(uniqueTags);
    }, [steps]);

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
    const filteredSteps = useMemo(() => {
        if (!steps) return [];

        let filtered = [...steps];

        // Filtro per tag
        if (selectValue.trim() !== "" && selectValue.trim() !== "-") {
            filtered = filtered.filter((step) =>
                step.events?.some((event) =>
                    event.moments?.some((moment) =>
                        moment.tags?.some((tag) =>
                            tag.toLowerCase().includes(selectValue.trim().toLowerCase())
                        )
                    )
                )
            );
        }

        // Filtro per titolo
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((step) =>
                step.stepTitle?.toLowerCase().includes(searchQuery.trim().toLowerCase())
            );
        }

        // Ordinamento
        filtered.sort((a, b) => {
            let result = 0;
            if (sortBy === "title") {
                result = a.stepTitle.localeCompare(b.stepTitle);
            } else if (sortBy === "tags") {
                const tagsA = (a.events || [])
                    .flatMap(event => event.moments || [])
                    .flatMap(moment => moment.tags || [])
                    .join(" ")
                    .toLowerCase();
                const tagsB = (b.events || [])
                    .flatMap(event => event.moments || [])
                    .flatMap(moment => moment.tags || [])
                    .join(" ")
                    .toLowerCase();
                result = tagsA.localeCompare(tagsB);
            }
            return result * sortOrder;
        });

        return filtered;
    }, [steps, searchQuery, selectValue, sortBy, sortOrder]);

    return (
        <>
            {/* Filtro testo */}
            <div className="pb-3">
                <label><strong>Cerca una tappa</strong></label>
                <input
                    type="text"
                    className="bg-[#4a5566] block w-full p-2 text-white rounded-lg text-xs"
                    placeholder="Cerca una tappa..."
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
                    <strong style={{ cursor: "pointer" }} onClick={() => handleSort("title")}>
                        TITOLO {sortBy === "title" ? (sortOrder === 1 ? "▲" : "▼") : ""}
                    </strong>
                    <strong style={{ cursor: "pointer" }} onClick={() => handleSort("tags")}>
                        {sortBy === "tags" ? (sortOrder === 1 ? "▲" : "▼") : ""} TAG
                    </strong>
                </p>
            </div>

            {/* Lista tappe */}
            {filteredSteps.length > 0 ? (
                filteredSteps.map((step) => (
                    <StepCardComponent
                        key={step.stepId}
                        step={step}
                        tripId={tripId}
                    />
                ))
            ) : (
                <p><strong>Nessuna tappa trovata</strong></p>
            )}
        </>
    );
}
