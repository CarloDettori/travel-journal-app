import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import TripFilterComponent from "../components/common/TripFilterComponent.jsx";

export default function TripPage() {
    const { trips } = useContext(GlobalContext);

    return (
        <section className="w-700 overflow-y-scroll">
            <h1 className="text-2xl mb-10 text-center">VIAGGI DISPONIBILI</h1>
            <TripFilterComponent trips={trips} />
        </section>
    );
}
