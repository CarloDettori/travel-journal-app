import FrameComponent from "./FrameComponent.jsx"
import { Link } from "react-router-dom"
import BarComponent from "./BarComponent.jsx"
import { useState, useEffect } from "react";

export default function TripCardComponent({ trip }) {

    const [tags, setTags] = useState([]);

    useEffect(() => {
        if (!trip) return;
        const uniqueTags = [];

        trip.steps?.forEach((step) => {
            step.events?.forEach((event) => {
                event.moments?.forEach((moment) => {
                    moment.tags?.forEach((tag) => {
                        if (!uniqueTags.includes(tag)) {
                            uniqueTags.push(tag);
                        }
                    });
                });
            });
        });

        setTags(uniqueTags);
    }, [trip]);

    return (
        <Link className=" flex w-full" to={`/trips/${trip.tripId}`}>
            <FrameComponent >
                <div className="p-5 pb-0 flex justify-between">
                    <div className="p-3 flex flex-col justify-between">
                        <h2><strong className="text-xl" >{trip.tripTitle}</strong></h2>
                        <p className="text-sm py-1">{trip.tripDescription}</p>
                    </div>

                    <div className="p-3 ps-10 flex flex-col items-end">
                        <div className="flex"><p className="text-sm p-1">IPEGNO FISICO: <strong>{trip.sbat}</strong></p> {<BarComponent n={trip.sbat} />}</div>
                        <div className="flex"><p className="text-sm p-1">EFFORT ECONOMICO: <strong>{trip.moneyEffort}</strong></p><BarComponent n={trip.moneyEffort} /></div>
                        <p className="text-sm p-1">PREZZO COMPLESSIVO: <strong>{trip.price} $</strong></p>
                    </div>
                </div>
                <div className=" p-5 flex flex-wrap max-w-[10]" style={{ maxWidth: "calc(100vw - 72px)", overflowWrap: "break-word" }}>
                    {tags.map((tag) => <p className="px-2 text-sm">{tag}</p>)}
                </div>
            </FrameComponent>

        </Link >
    )

}