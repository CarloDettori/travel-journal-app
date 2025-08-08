import TripfilterComponent from "../components/common/TripFilterComponent.jsx"
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx"

export default function TripsPage() {
    const { trips, setTrips } = useContext(GlobalContext)


    return (
        <section className="w-full overflow-y-scroll ">

            <TripfilterComponent trips={trips} />

        </section>
    )
}