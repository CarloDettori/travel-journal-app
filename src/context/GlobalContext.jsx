import { createContext, useState, useEffect } from "react"
const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

    const [theme, setTheme] = useState("land")

    const [posts, setPosts] = useState([])

    useEffect(() => {

        fetch("public/trips.json")
            .then(res => res.json())
            .then(data => setPosts(data))
            .catch((err) => console.log(err), setPosts([]))

    }, [])

    return (
        <GlobalContext.Provider value={{ posts, setPosts, theme, setTheme }}>
            {children}
        </GlobalContext.Provider>
    )
};

export { GlobalContext, GlobalProvider }