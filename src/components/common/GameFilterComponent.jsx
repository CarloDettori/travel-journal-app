import { useState, useMemo, useEffect, useCallback } from "react"
import GameCardComponent from "./GameCardComponent";



export default function GameFilterComponent({ games, onSelectGame }) {

    const [searchQuery, setSearchQuery] = useState("");
    const [selectValue, setSelectValue] = useState("");

    function debounce(callback, delay) {

        let timer;

        return (value) => {
            clearTimeout(timer)
            timer = setTimeout(() => {
                callback(value)
            }, delay)
        }
    }

    const handleFilter = useCallback(debounce((event) => {

        const { value, type } = event.target;

        if (type === "text") {
            setSearchQuery(value)
        } else {
            setSelectValue(value)
        }

    }, 500))

    const [sortBy, setSortBy] = useState("");
    const [sortOrder, setSortOrder] = useState(1);

    const handleSort = useCallback((column) => {
        if (sortBy === column) {
            setSortOrder((prev) => prev * -1);
        } else {
            setSortBy(column);
            setSortOrder(1);
        }
    }, [sortBy]);


    const filteredGames = useMemo(() => {

        if (!games) return [];

        let filtered = games;

        if (selectValue.trim() !== "" && selectValue.trim() !== "-") {
            filtered = filtered.filter(game =>
                game.category.toLowerCase().includes(selectValue.trim().toLowerCase())
            );
        }

        if (searchQuery.trim() !== "") {
            filtered = filtered.filter(game =>
                game.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
            );
        }

        const gameCopy = [...filtered];

        gameCopy.sort((a, b) => {

            let result = 0;

            if (sortBy === "title") {
                result = a.title.localeCompare(b.title)

            } else if (sortBy === "category") {
                result = a.category.localeCompare(b.category)

            }
            //console.log(result)
            return result * sortOrder;
        });

        return gameCopy;

    }, [games, searchQuery, selectValue, sortBy, sortOrder,]);

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const uniqueCategories = [];
        filteredGames?.forEach(game => {
            if (!uniqueCategories.includes(game.category)) {
                uniqueCategories.push(game.category);
            }
        });
        setCategories(uniqueCategories);
    }, [searchQuery, games])

    return (<>

        <div className="grid gap-6 mb-3 md:grid-cols-2 ">

            <div className="pb-10 ">

                <label htmlFor="small-input" className="block mb-2  font-normal arcadefont" ><strong>Cerca un gioco</strong></label>


                <input type="text" id="small-input" className="bg-[#4a5566] block w-full p-2 text-white shadow-md rounded-lg text-xs" placeholder="Super Mario" onChange={handleFilter} />
            </div >

            <div className="pb-10">
                <label htmlFor="countries" className="block mb-2 font-normal  arcadefont"><strong>Filtro categorie</strong></label>
                <select id="countries" type="select" className="block w-full bg-[#4a5566] p-2 text-white shadow-md rounded-lg text-xs" onChange={handleFilter}>

                    <option value="" defaultValue>Nessuna</option>
                    {categories?.map((category) => <option key={category} value={category} >{category}</option>)}

                </select>
            </div>
        </div >

        {filteredGames.length > 0 ? <>
            <div className="pb-3 text-end">


                <p className="flex justify-between">
                    <strong className="text-start arcadefont" style={{ cursor: "pointer" }} onClick={() => handleSort("title")}>

                        TITOLO {sortBy === "title" ? (sortOrder === 1 ? "▲" : "▼") : ""}

                    </strong>



                    <strong className="arcadefont" style={{ cursor: "pointer" }} onClick={() => handleSort("category")}>

                        {sortBy === "category" ? (sortOrder === 1 ? "▲" : "▼") : ""} CATEGORIA

                    </strong>
                </p>

            </div>

            <div className="flex flex-col gap-4 flex-wrap">
                {filteredGames?.map((game) =>
                    <div key={game.title} onClick={() => onSelectGame && onSelectGame(game.id)} style={{ cursor: "pointer" }}><GameCardComponent id={game.id} title={game.title} category={game.category} /></div>
                )}

            </div></> : <p className="arcadefont"><strong>nessun gioco trovato</strong></p>
        }



    </>)
}