import { useState } from "react"
import FrameComponent from "./FrameComponent.jsx"
import { Link } from "react-router-dom"

export default function StepCardComponent({ step, tripId }) {
    const [clickedStepId, setClickedStepId] = useState(0)
    console.log(clickedStepId)

    return (
        clickedStepId !== step.stepId
            ?
            < div className="flex items-center w-full flex-shrink min-w-0" onClick={() => { setClickedStepId(step.stepId) }} >
                <img className="img-natural mx-3" src="/sprites/step.png" alt="" />

                <div className="w-full cursor-pointer">

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
                        <div>
                            <div className="flex">
                                <h2 className="text-xl mb-4"><strong>{step.stepTitle}</strong></h2>
                                <p className=" mt-1 mb-4 ms-auto">LUOGO: {step.place}</p>
                            </div>
                            <div className="flex justify-between flex-wrap">
                                <div className="  pe-20">
                                    <p><strong>{step.stepDescription}</strong></p>
                                    <div className="flex flex-col gap-5 my-5">
                                        {
                                            step.events.map((event) => {
                                                return (
                                                    <div key={event.eventId} className="flex text-sm">
                                                        <img className="img-natural my-auto me-2" src="/sprites/event.png" alt="" />
                                                        <p>{event.eventDescription}</p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between gap-5 text-sm mb-5">
                                    <div className="px-3 flex flex-col gap-2">
                                        {step.goodies.map((good, index) => {
                                            return (
                                                <div className="flex">
                                                    <img className="img-natural my-auto me-2" src="/emoticon/004-smile.png" alt="" />
                                                    <p key={index + 1}>{good}</p>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className="px-3 flex flex-col gap-2">
                                        {step.badies.map((bad, index) => {
                                            return (
                                                <div className="flex">
                                                    <img className="img-natural my-auto me-2" src="/emoticon/022-sad.png" alt="" />
                                                    <p key={index + 1}>{bad}</p>
                                                </div>
                                            )
                                        })}
                                    </div>

                                </div>
                            </div>
                        </div>
                        <Link className="mx-auto mt-5 bg-[#4a5566] p-2 text-white rounded-lg text-xs" to={`/trips/${tripId}/${step.stepId}`}>dettagli</Link>

                    </div>

                </FrameComponent>

            </div>
    )

}