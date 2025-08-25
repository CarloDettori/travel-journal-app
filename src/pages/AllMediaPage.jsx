import { useContext, useState } from "react";
import { GlobalContext } from "../context/GlobalContext.jsx";
import FrameComponent from "../components/common/FrameComponent.jsx";


export default function AllMediaPage() {

    const { trips } = useContext(GlobalContext);
    const [selectedMedia, setSelectedMedia] = useState("foto")
    const allMomentImages = trips
        .flatMap(trip => trip.steps || [])
        .flatMap(step => step.events || [])
        .flatMap(event => event.moments || [])
        .map(moment => moment.momentImg)
        .filter(Boolean);

    const allMomentVideos = trips
        .flatMap(trip => trip.steps || [])
        .flatMap(step => step.events || [])
        .flatMap(event => event.moments || [])
        .map(moment => moment.momentVideo)
        .filter(Boolean);

    return (
        <section className="w-700 overflow-y-scroll">
            <h1 className="text-2xl mb-10 text-center"></h1>
            <div className="flex w-full justify-center pb-10">
                <button
                    className={`font-bold py-2 px-4 rounded-l ${selectedMedia === "foto" ? "bg-gray-400" : "bg-gray-300 hover:cursor"}`}
                    disabled={selectedMedia === "foto"}
                    onClick={() => setSelectedMedia("foto")}
                >
                    FOTO
                </button>
                <button
                    className={`font-bold py-2 px-4 rounded-l ${selectedMedia === "video" ? "bg-gray-400" : "bg-gray-300 hover:cursor"}`}
                    disabled={selectedMedia === "video"}
                    onClick={() => setSelectedMedia("video")}
                >
                    VIDEO
                </button>
            </div>
            <div className="flex flex-wrap justify-center">

                {selectedMedia === "foto" ?
                    allMomentImages.map((img, index) => {
                        return (

                            <div key={index + 1} className="pb-10">

                                <FrameComponent>
                                    <img className="my-3 photo mx-3 rounded inline shrink" src={img} alt="photo" />
                                </FrameComponent>

                            </div>

                        )
                    })
                    : ""}

                {selectedMedia === "video" ?
                    allMomentVideos.map((video, index) => {
                        return (

                            <div key={index + 1} className="pb-10">

                                <FrameComponent>
                                    <video controls muted>
                                        <source src={video} type="video/mp4"></source>
                                    </video>

                                </FrameComponent>

                            </div>

                        )
                    })
                    : ""}

            </div>
        </section>
    );
}
