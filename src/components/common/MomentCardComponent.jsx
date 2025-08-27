import { useState } from "react"
import FrameComponent from "./FrameComponent.jsx"
import { Link } from "react-router-dom"

export default function MomentCardComponent({ moment }) {
    console.log(moment)
    return (
        < div className="flex items-center me-8">

            <img className="img-natural mx-3" src="/sprites/moment.png" alt="" />

            <div className="hover:poiter w-full">

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
                            <img className="my-5 mx-auto rounded" src={moment.momentImg} alt="" />
                            <p>{moment.tags.map((tag) => tag + " ")}</p>
                        </div>
                    }



                </FrameComponent>

            </div >

        </div >



    )

}