import { useState } from "react"
import FrameComponent from "./FrameComponent.jsx"
import { Link } from "react-router-dom"

export default function MomentCardComponent({ moment }) {

    return (
        < div className="flex items-center me-8">

            <img className="img-natural mx-3" src="/sprites/moment.png" alt="" />

            <div className="hover:poiter">

                <FrameComponent >

                    <div className="p-3">
                        <p>{moment.momentDescription}</p>
                        <img className="py-1" src={moment.momentImg} alt="" />
                        <p>{moment.tags.map((tag) => tag + " ")}</p>
                    </div>

                </FrameComponent>

            </div>

        </div >



    )

}