


import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import EventFilterComponent from "../components/common/EventFilterComponent.jsx";

export default function EventPage() {
    const { tripId, stepId } = useParams();
    const { trips } = useContext(GlobalContext);

    const trip = trips?.find((t) => t.tripId === Number(tripId));
    const step = trip?.steps.find((s) => s.stepId === Number(stepId));
    const events = step?.events || [];

    return (
        <section className="w-full overflow-y-scroll">
            <h1 className="text-2xl mb-10 text-center">
                EVENTI DELLA TAPPA: {step?.stepTitle || "Non trovato"}
            </h1>
            <EventFilterComponent events={events} tripId={tripId} stepId={stepId} />
        </section>
    );
}
