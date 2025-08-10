import { useParams } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext.jsx"
import EventFilterComponent from "../components/common/EventFilterComponent.jsx"


export default function TripDetailPage() {
    const { id } = useParams()
    console.log(id)
    const { trips, setTrips } = useContext(GlobalContext)


    const trip = trips?.find((trip) => trip.id.toString() === id)
    const step = trip?.steps.find((step) => step.stepId.toString() === id)
    console.log(trip)
    return (
        <section className="w-full overflow-y-scroll">
            <h1 className="text-2xl mb-10 text-center"> EVENTI DELLA TAPPA A </h1 >


            <div className="">


                <EventFilterComponent />


            </div>
        </section>
    )
}