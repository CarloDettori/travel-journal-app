import { createContext, useState, } from "react"
const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {


    const postsData = use(fetch("/api/posts").then(res => res.json()));
    const [posts, setPosts]



    return (
        <GlobalContext.Provider value={{ posts, setPosts, favourites, setFavourites }}>
            {children}
        </GlobalContext.Provider>
    )
};

export { GlobalContext, GlobalProvider }