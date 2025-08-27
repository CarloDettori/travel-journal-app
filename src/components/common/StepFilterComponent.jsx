import { useState, useMemo, useCallback } from "react";
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
    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState(1);

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
            setSearchQuery(event.target.value);
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
            }
            return result * sortOrder;
        });

        return filtered;
    }, [steps, searchQuery, sortBy, sortOrder]);

    return (
        <>
            {/* Filtro testo */}
            <div className="pb-3">
                <label><strong>Cerca una tappa</strong></label>
                <input
                    type="text"
                    className="bg-[#4a5566] block w-full p-2 text-white rounded-lg text-xs"
                    placeholder="Roma"
                    onChange={handleFilter}
                />
            </div>

            {/* Ordinamento */}
            <div className="pt-3 text-end">
                <p className="flex justify-between">
                    <strong style={{ cursor: "pointer" }} onClick={() => handleSort("title")}>
                        <span style={{ display: "inline-flex", alignItems: "center" }}>
                            TITOLO
                            {sortBy === "title" ? (
                                sortOrder === 1 ? (
                                    <img className="px-1" src="/hud/arrow-up.png" alt="" />
                                ) : (
                                    <img style={{ transform: "scaleY(-1)" }} className="px-1" src="/hud/arrow-up.png" alt="" />
                                )
                            ) : null}

                        </span>
                    </strong>
                </p>
            </div>

            {/* Lista tappe */}
            <div className="w-200 mx-auto">
                {filteredSteps.length > 0 ? (
                    <div className="flex flex-col gap-3">
                        {filteredSteps.map((step) => (
                            <StepCardComponent
                                key={step.stepId}
                                step={step}
                                tripId={tripId}
                            />
                        ))}
                    </div>
                ) : (
                    <p><strong>Nessuna tappa trovata</strong></p>
                )}
            </div>
        </>
    );





}
