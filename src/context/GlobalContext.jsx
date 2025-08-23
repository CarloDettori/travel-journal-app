import { createContext, useState, useEffect } from "react"
const GlobalContext = createContext()

const GlobalProvider = ({ children }) => {

    const [trips, setTrips] = useState([])

    const [theme, setTheme] = useState(1)
    const [tripTheme, setTripTheme] = useState(theme)
    const [stepTheme, setStepTheme] = useState(theme)


    async function fetchData(url) {
        const response = await fetch(url)
        const dati = await response.json()
        return dati
    }

    useEffect(() => {
        fetchData("/trips.json")
            .then(obj => setTrips(obj))
            .catch(error => console.error(error))
            .finally(console.log("fetch end"))
    }, [])

    return (
        <GlobalContext.Provider value={{ trips, setTrips, theme, setTheme, tripTheme, setTripTheme, stepTheme, setStepTheme }}>
            {children}
        </GlobalContext.Provider>
    )
};

export { GlobalContext, GlobalProvider }