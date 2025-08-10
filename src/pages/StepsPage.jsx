import { useParams } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext.jsx"
import StepFilterComponent from "../components/common/StepFilterComponent.jsx"


export default function StepPage() {

    const { id } = useParams()
    console.log(id)
    const { trips, setTrips } = useContext(GlobalContext)


    const trip = trips?.find((trip) => trip.id.toString() === id)
    console.log(trip)
    return (
        <section className="w-full overflow-y-scroll">
            <h1 className="text-2xl mb-10 text-center"> TAPPE DEL VIAGGIO </h1 >



            <StepFilterComponent steps={trip.steps} />

        </section>
    )
}