import { useState } from "react"
import FrameComponent from "./FrameComponent.jsx"
import { Link } from "react-router-dom"

export default function StepCardComponent({ step, tripId }) {
    const [clickedStepId, setClickedStepId] = useState(0)
    console.log(clickedStepId)

    return (
        clickedStepId !== step.stepId
            ?
            < div className="flex items-center my-3 me-8" onClick={() => { setClickedStepId(step.stepId) }} >
                <img className="img-natural mx-3" src="/sprites/step.png" alt="" />

                <div className="hover:poiter">

                    <FrameComponent >

                        <div className="p-3">
                            <h2 className="text-xl mb-1"><strong>{step.stepTitle}</strong></h2>
                            <p>{step.stepDescription}</p>
                        </div>

                    </FrameComponent>

                </div>

            </div >


            :


            <div className="flex items-center my-3 me-8 ">

                <img className="img-natural mx-3" src="/sprites/step.png" alt="" />

                <FrameComponent >


                    <div className="p-3 flex flex-col">
                        <h2 className="text-xl mb-1"><strong>{step.stepTitle}</strong></h2>
                        <p>{step.stepDescription}</p>
                        {
                            step.events.map((event) => {
                                return (
                                    <div key={event.eventId} className="flex my-3 text-sm">
                                        <img className="img-natural my-auto me-2" src="/sprites/event.png" alt="" />
                                        <p>{event.eventDescription}</p>
                                    </div>
                                )
                            })
                        }
                        <Link className="ms-auto mt-3 hover:cursor bg-[#4a5566] p-2 text-white rounded-lg text-xs" to={`/trips/${trip.tripId}/${step.stepId}`}>dettagli</Link>

                    </div>

                </FrameComponent>

            </div>
    )

}