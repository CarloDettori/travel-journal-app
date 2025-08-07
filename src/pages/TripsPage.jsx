import TripCardComponent from "../components/common/TripCardComponent.jsx"
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext"

export default function TripsPage() {
    const { trips, setTrips } = useContext(GlobalContext)


    return (
        <section className="w-full overflow-y-scroll ">
            <h1 className="pb-5 text-center"> I TUOI VIAGGI </h1 >
            <div className="flex flex-wrap">
                {
                    trips.map((trip) => {
                        return <TripCardComponent key={trip.id} trip={trip} />
                    })
                }
            </div>
        </section>
    )
}