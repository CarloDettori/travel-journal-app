import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import FrameComponent from "../components/common/FrameComponent.jsx";


export default function AllPhotoPage() {

    const { trips } = useContext(GlobalContext);
    const allMomentImages = trips
        .flatMap(trip => trip.steps || [])
        .flatMap(step => step.events || [])
        .flatMap(event => event.moments || [])
        .map(moment => moment.momentImg)
        .filter(Boolean);
    return (
        <section className="w-700 overflow-y-scroll">
            <h1 className="text-2xl mb-10 text-center"></h1>
            <div className="flex flex-wrap">
                {
                    allMomentImages.map((img, index) => {
                        return (
                            <div className="pb-10">
                                <FrameComponent key={index + 1}>
                                    <img className="my-3 photo mx-3 rounded inline shrink" src={img} alt="photo" />
                                </FrameComponent>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    );
}
