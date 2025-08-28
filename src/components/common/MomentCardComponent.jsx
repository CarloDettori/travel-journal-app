import { useState } from "react"
import FrameComponent from "./FrameComponent.jsx"
import { Link } from "react-router-dom"

export default function MomentCardComponent({ moment }) {
    const [showModal, setShowModal] = useState(false);
    return (
        < div className="flex items-center me-8">

            <img className="img-natural mx-3" src="/sprites/moment.png" alt="" />

            <div className="w-full">

                <FrameComponent >

                    {moment.momentVideo.includes("mp4") ?
                        <div className="p-5">
                            <p>{moment.momentDescription}</p>
                            <video className="my-5 mx-auto rounded" controls muted>
                                <source src={"/" + moment.momentVideo} type="video/mp4"></source>
                            </video>
                            <p>{moment.tags.map((tag) => tag + " ")}</p>
                        </div>
                        :
                        <div className="p-5">
                            <p>{moment.momentDescription}</p>
                            <img className="my-5 mx-auto rounded cursor-pointer" src={moment.momentImg} alt="" onClick={() => setShowModal(true)} />
                            <p>{moment.tags.map((tag) => tag + " ")}</p>
                        </div>
                    }



                </FrameComponent>

            </div >

            {showModal && (
                <div
                    className="fixed inset-0 bg-opacity-90 bg-[#4a5566] flex items-center justify-center z-50"
                    onClick={() => setShowModal(false)}
                >
                    <div className="relative">
                        {/* X di chiusura */}
                        <button
                            className="p absolute top-2 right-2 text-white font-bold bg-[#4a5566] rounded-full ps-2 pe-1.5 pb-0.5 cursor-pointer z-10"
                            onClick={(e) => { e.stopPropagation(); setShowModal(false); }}
                            aria-label="Chiudi"
                        >
                            x
                        </button>
                        <img
                            src={moment.momentImg}
                            alt=""
                            className="max-w-[90vw] max-h-[90vh] rounded shadow-lg"
                            onClick={e => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
        </div >



    )

}