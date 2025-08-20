import { useState } from "react"
import FrameComponent from "./FrameComponent.jsx"
import { Link } from "react-router-dom"

export default function StepCardComponent({ step, tripId }) {
    const [clickedStepId, setClickedStepId] = useState(0)
    console.log(clickedStepId)

    return (
        clickedStepId !== step.stepId
            ?
            < div className="flex items-center w-full" onClick={() => { setClickedStepId(step.stepId) }} >
                <img className="img-natural mx-3" src="/sprites/step.png" alt="" />

                <div className="hover::poiter">

                    <FrameComponent >

                        <div className="p-3">
                            <h2 className="text-xl mb-1"><strong>{step.stepTitle}</strong></h2>
                            <p>{step.stepDescription}</p>
                        </div>



                    </FrameComponent>

                </div>

            </div >


            :


            <div className="flex items-center">

                <img className="img-natural mx-3" src="/sprites/step.png" alt="" />

                <FrameComponent >


                    <div className="p-3 flex flex-col">
                        <div className="flex">
                            <div className="pe-20">
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
                            </div>
                            <div className="flex flex-col gap-5 justify-center text-sm">
                                <div className="px-3 ">
                                    {step.goodies.map((good, index) => <p key={index + 1}>{good}</p>)}
                                </div>
                                <div className="px-3">
                                    {step.badies.map((bad, index) => <p key={index + 1}>{bad}</p>)}
                                </div>

                            </div>
                        </div>
                        <Link className="ms-auto mt-3 hover:cursor bg-[#4a5566] p-2 text-white rounded-lg text-xs" to={`/trips/${tripId}/${step.stepId}`}>dettagli</Link>

                    </div>

                </FrameComponent>

            </div>
    )

}