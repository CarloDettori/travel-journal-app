import FrameComponent from "./FrameComponent.jsx"
import { Link } from "react-router-dom"

export default function StepCardComponent({ step, tripId }) {


    return (
        <Link className="h-full hover:cursor tripcard" to={"/trips/" + tripId + "/" + step.stepId}>
            <FrameComponent >
                <div className="p-3">
                    <h2>{step.stepTitle}</h2>
                    <p className="text-sm">{step.stepDescription}</p>
                </div>
            </FrameComponent>

        </Link>
    )

}