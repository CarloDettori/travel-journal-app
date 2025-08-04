import { createContext, useState, useEffect } from "react"
const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {



    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch("public/trips.json")
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch(() => setPosts([]))
    }, [])



    return (
        <GlobalContext.Provider value={{ posts, setPosts }}>
            {children}
        </GlobalContext.Provider>
    )
};

export { GlobalContext, GlobalProvider }