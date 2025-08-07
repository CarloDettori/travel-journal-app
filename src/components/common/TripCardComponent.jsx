import FrameComponent from "./FrameComponent.jsx"
import { Link } from "react-router-dom"

export default function TripCardComponent({ trip }) {


    return (
        <Link className="h-full hover:cursor tripcard" to={"/trips/" + trip.id}>
            <FrameComponent >
                <div className="p-3">
                    <h2>{trip.tripTitle}</h2>
                    <p className="text-sm">{trip.tripDescription}</p>
                </div>
            </FrameComponent>

        </Link>
    )

}