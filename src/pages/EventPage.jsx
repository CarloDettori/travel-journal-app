


import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import EventFilterComponent from "../components/common/EventFilterComponent.jsx";

export default function EventPage() {
    const { tripId, stepId } = useParams();
    const { trips } = useContext(GlobalContext);

    console.log("Params:", tripId, stepId);

    const trip = trips?.find(trip => trip.tripId === Number(tripId));;
    console.log("Trip trovato:", trip);

    const step = trip?.steps.find(step => step.stepId === Number(stepId));
    console.log("Step trovato:", step);

    if (!trip) {
        return <p className="text-center">Eventi non trovati</p>;
    }

    if (!step) {
        return <p className="text-center">Step non trovato</p>;
    }

    return (
        <section className="w-full overflow-y-scroll">
            <h1 className="text-2xl mb-10 text-center">
                EVENTI DELLA TAPPA: {step.stepTitle}
            </h1>
            <div>
                <EventFilterComponent events={step.events} />
            </div>
        </section>
    );
}