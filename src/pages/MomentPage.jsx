import { useParams } from "react-router-dom"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext.jsx"
import MomentFilterComponent from "../components/common/MomentFilterComponent.jsx"


export default function MomentPage() {

    const { tripId, stepId, eventId } = useParams();
    console.log(id)
    const { trips, setTrips } = useContext(GlobalContext)


    const trip = trips.find(trip => trip.tripId === Number(tripId));
    const step = trip?.steps.find(step => step.stepId === Number(stepId));
    const event = step?.events.find(event => event.eventId === Number(eventId));


    return (
        <section className="w-full overflow-y-scroll">
            <h1 className="text-2xl mb-10 text-center"> MOMENTI MEMORABILI </h1 >


            <div className="">


                <MomentFilterComponent key={event.eventId} />


            </div>
        </section>
    )
}