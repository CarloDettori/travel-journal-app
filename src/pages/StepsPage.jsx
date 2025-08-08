import { useParams } from "react-router-dom"
import StepCardComponent from "../components/common/StepCardComponent"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function TripDetailPage() {
    const { id } = useParams()
    console.log(id)
    const { trips, setTrips } = useContext(GlobalContext)


    const trip = trips?.find((trip) => trip.id.toString() === id)
    console.log(trip)
    console.log(trips)
    return (
        <section>
            <h1> TAPPE DEL VIAGGIO </h1 >
            <div className="flex">
                <img className="img-natural my-auto mx-3" src="/sprites/step.png" alt="" />
                <div>
                    {
                        trip?.steps.map((step) => {
                            return <StepCardComponent key={step.id} step={step} />
                        })
                    }
                </div>
            </div>
        </section>
    )
}