import { useState } from "react"
import FrameComponent from "./FrameComponent.jsx"
import { Link } from "react-router-dom"

export default function EventCardComponent({ event, stepId, tripId }) {

    const [clickedEventId, setClickedEventId] = useState(0)

    return (
        clickedEventId !== event.eventId
            ?
            < div className="flex items-center my-3 me-8" onClick={() => { setClickedEventId(event.eventId) }} >
                <img className="img-natural mx-3" src="/sprites/event.png" alt="" />

                <div className="hover:poiter">

                    <FrameComponent >

                        <div className="p-3">
                            <h2 className="text-xl mb-1"><strong>{event.eventTitle}</strong></h2>
                            <p>{event.eventDescription}</p>
                        </div>

                    </FrameComponent>

                </div>

            </div >


            :


            <div className="flex items-center my-3 me-8 ">

                <img className="img-natural mx-3" src="/sprites/event.png" alt="" />

                <FrameComponent >


                    <div className="p-3 flex flex-col">

                        <h2 className="text-xl mb-1"><strong>{event.eventTitle}</strong></h2>
                        <p>{event.eventDescription}</p>
                        {
                            event.moments.map((moment) => {
                                return (
                                    <div key={moment.momentId} className="flex my-3 text-sm">
                                        <img className="img-natural my-auto me-2" src="/sprites/moment.png" alt="" />
                                        <p >{moment.momentDescription}</p>
                                    </div>
                                )
                            })
                        }
                        <Link className="ms-auto mt-3 hover:cursor bg-[#4a5566] p-2 text-white rounded-lg text-xs" to={`/trips/${tripId}/${stepId}/${event.eventId}`}>dettagli</Link>

                    </div>

                </FrameComponent>

            </div>
    )

}