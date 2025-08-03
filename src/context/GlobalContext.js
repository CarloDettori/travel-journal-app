import { createContext, useState, } from "react"
const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {


    const postsData = use(fetch("/api/posts").then(res => res.json()));
    const [posts, setPosts] = useState(postsData)



    return (
        <GlobalContext.Provider value={{ posts, setPosts }}>
            {children}
        </GlobalContext.Provider>
    )
};

export { GlobalContext, GlobalProvider }