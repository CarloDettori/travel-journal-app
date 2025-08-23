import { useParams } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import StepFilterComponent from "../components/common/StepFilterComponent.jsx";

export default function StepPage() {
    const { tripId } = useParams();
    const { trips } = useContext(GlobalContext);

    const trip = trips?.find((t) => t.tripId === Number(tripId));
    const steps = trip?.steps || [];

    return (
        <section className="w-full overflow-y-scroll">
            <h1 className="text-2xl mb-10 text-center">
                TAPPE DEL VIAGGIO: {trip?.tripTitle || "Non trovato"}
            </h1>
            <StepFilterComponent />
        </section>
    );
}
