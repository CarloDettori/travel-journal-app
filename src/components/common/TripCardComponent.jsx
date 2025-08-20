import FrameComponent from "./FrameComponent.jsx"
import { Link } from "react-router-dom"
import BarComponent from "./BarComponent.jsx"

export default function TripCardComponent({ trip }) {
    console.log(trip)

    return (
        <Link className="hover:cursor flex" to={`/trips/${trip.tripId}`}>
            <FrameComponent >
                <div className="flex">
                    <div className="p-3">
                        <h2><strong className="text-xl" >{trip.tripTitle}</strong></h2>
                        <p className="text-sm py-1">{trip.tripDescription}</p>
                    </div>
                    <div className="p-3 ps-10 flex flex-col items-end">
                        <div className="flex"><p className="text-sm p-1">IPEGNO FISICO: <strong>{trip.sbat}</strong></p> {<BarComponent n={trip.sbat} />}</div>
                        <div className="flex"><p className="text-sm p-1">EFFORT ECONOMICO: <strong>{trip.moneyEffort}</strong></p><BarComponent n={trip.moneyEffort} /></div>
                        <p className="text-sm p-1">PREZZO COMPLESSIVO: <strong>{trip.price} $</strong></p>
                    </div>
                </div>
            </FrameComponent>

        </Link>
    )

}