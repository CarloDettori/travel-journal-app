import { useState } from "react";

export default function FrameComponent({ children }) {

    const [frameNumber, setFrameNumber] = useState(1);

    const frameUrl = (direction) => `url("/frames/frame${frameNumber}${direction}.png")`;

    return (
        <div className="flex flex-col w-full">

            <div className="pt-3 w-full">
                {/* Top */}
                <div className="frame-row">
                    <div className="frame-corner" style={{ backgroundImage: frameUrl("a") }}></div>
                    <div className="frame-hori" style={{ backgroundImage: frameUrl("l") }}></div>
                    <div className="frame-corner" style={{ backgroundImage: frameUrl("a"), transform: "scaleX(-1)" }}></div>
                </div>

                {/* Middle */}
                <div className="central-row">
                    <div className="frame-vert" style={{ backgroundImage: frameUrl("v") }}></div>
                    <div id="center">
                        <div>{children}</div>

                    </div>
                    <div className="frame-vert" style={{ backgroundImage: frameUrl("v"), transform: "scaleX(-1)" }}></div>
                </div>

                {/* Bottom */}
                <div className="frame-row">
                    <div className="frame-corner" style={{ backgroundImage: frameUrl("a"), transform: "scaleY(-1)" }}></div>
                    <div className="frame-hori" style={{ backgroundImage: frameUrl("l"), transform: "scaleY(-1)" }}></div>
                    <div className="frame-corner" style={{ backgroundImage: frameUrl("a"), transform: "scale(-1, -1)" }}></div>
                </div>

            </div >

            <div onClick={e => { e.preventDefault(); e.stopPropagation() }} className="flex items-center pt-1 pb-2 hover:pointer">
                {frameNumber === 1 ?
                    <img style={{ transform: "scaleX(-1)" }} className="px-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(), setFrameNumber(26) }} src="/hud/arrow-right.png" alt="" />
                    :
                    <img style={{ transform: "scaleX(-1)" }} className="px-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(), setFrameNumber(frameNumber - 1) }} src="/hud/arrow-right.png" alt="" />}
                <p className="text-sm ps-1">{frameNumber}</p>
                {frameNumber === 26 ?
                    <img className="px-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFrameNumber(1) }} src="/hud/arrow-right.png" alt="" />
                    :
                    <img className="px-1" onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFrameNumber(frameNumber + 1) }} src="/hud/arrow-right.png" alt="" />}
            </div>
        </div>
    );
}