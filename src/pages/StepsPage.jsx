import { useParams } from "react-router-dom"
import StepCardComponent from "../components/common/StepCardComponent"
import { useContext } from "react"
import { GlobalContext } from "../context/GlobalContext"

export default function TripDetailPage() {
    const { id } = useParams()

    const { trips, setTrips } = useContext(GlobalContext)
    console.log(trips)
    return (
        <section>
            <h1> TRIPDETTAILPAGE </h1 >
            <div className="flex">
                <img src="/sprites/step.png" alt="" />
                <div>
                    {
                        trips.find((trip) => trip.id === id).trip.steps.map((step) => {
                            return <StepCardComponent key={step.id} step={step} />
                        })
                    }
                </div>
            </div>
        </section>
    )
}