import { useState } from "react"
import FrameComponent from "./FrameComponent.jsx"
import { Link } from "react-router-dom"

export default function StepCardComponent({ step, tripId }) {
    const [clickedStepId, setClickedStepId] = useState(0)
    console.log(clickedStepId)
    console.log(clickedStepId)
    return (
        clickedStepId !== step.stepId
            ?
            < div className="flex items-center my-3 me-8" onClick={() => { setClickedStepId(step.stepId) }} >
                <img className="img-natural mx-3" src="/sprites/step.png" alt="" />

                <div className="hover:poiter">
                    <FrameComponent >


                        <div className="p-3">
                            <h2>{step.stepTitle}</h2>
                            <p className="text-sm">{step.stepDescription}</p>
                        </div>
                    </FrameComponent>
                </div>
            </div >
            :
            <div className="flex items-center my-3 me-8 ">
                <img className="img-natural mx-3" src="/sprites/step.png" alt="" />

                <FrameComponent >


                    <div className="p-3">
                        <h2>{step.stepTitle}</h2>
                        <p className="text-sm">{step.stepDescription}</p>
                        {
                            step.events.map((event) => {
                                return <p key={event.eventId}>{event.eventDescription}</p>
                            })
                        }
                        <Link className=" hover:cursor" to={"/trips/" + tripId + "/" + step.stepId}>dettagli</Link>
                    </div>
                </FrameComponent>


            </div>
    )

}