import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import MomentFilterComponent from "../components/common/MomentFilterComponent.jsx";

export default function MomentPage() {
    const { tripId, stepId, eventId } = useParams();
    const { trips } = useContext(GlobalContext);

    const trip = trips?.find((t) => t.tripId === Number(tripId));
    const step = trip?.steps.find((s) => s.stepId === Number(stepId));
    const event = step?.events.find((e) => e.eventId === Number(eventId));
    const moments = event?.moments || [];

    return (
        <section className="w-full overflow-y-scroll">
            <h1 className="text-2xl mb-10 text-center">
                MOMENTI MEMORABILI DELL'EVENTO: {event?.eventTitle || "Non trovato"}
            </h1>
            <MomentFilterComponent moments={moments} />
        </section>
    );
}
