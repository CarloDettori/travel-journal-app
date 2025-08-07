import { createContext, useState, useEffect } from "react"
const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

    const [trips, setTrips] = useState([])

    const [theme, setTheme] = useState("land")
    const [tripTheme, setTripTheme] = useState(theme)
    const [stepTheme, setStepTheme] = useState(theme)


    useEffect(() => {

        fetch("public/trips.json")
            .then(res => res.json())
            .then(data => setTrips(data))
            .catch((err) => console.log(err), setTrips([]))

    }, [])

    return (
        <GlobalContext.Provider value={{ trips, setTrips, theme, setTheme, tripTheme, setTripTheme, stepTheme, setStepTheme }}>
            {children}
        </GlobalContext.Provider>
    )
};

export { GlobalContext, GlobalProvider }