import { useParams } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext.jsx"
import StepFilterComponent from "../components/common/StepFilterComponent.jsx"


export default function StepPage() {

    const { tripId } = useParams()
    console.log(tripId)
    const { trips, setTrips } = useContext(GlobalContext)



    console.log(trips)

    const trip = trips.find(trip => trip.tripId === Number(tripId));
    console.log(trip)

    return (

        <section className="w-full overflow-y-scroll">

            <h1 className="text-2xl mb-10 text-center"> TAPPE DEL VIAGGIO </h1 >

            <StepFilterComponent steps={trip.steps} />

        </section>
    )
}