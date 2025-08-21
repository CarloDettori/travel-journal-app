import { useState } from "react";

export default function FrameComponent({ children }) {

    const [frameNumber, setFrameNumber] = useState(1);

    const frameUrl = (direction) => `url("/frames/frame${frameNumber}${direction}.png")`;

    return (
        <div className="py-3 w-full">
            {/* Top */}
            <div className="frame-row">
                <div className="frame-corner" style={{ backgroundImage: frameUrl("a") }}></div>
                <div className="frame-hori" style={{ backgroundImage: frameUrl("l") }}></div>
                <div className="frame-corner" style={{ backgroundImage: frameUrl("a"), transform: "scaleX(-1)" }}></div>
            </div>

            {/* Middle */}
            <div className="central-row">
                <div className="frame-vert" style={{ backgroundImage: frameUrl("v") }}></div>
                <div id="center">{children}</div>
                <div className="frame-vert" style={{ backgroundImage: frameUrl("v"), transform: "scaleX(-1)" }}></div>
            </div>

            {/* Bottom */}
            <div className="frame-row">
                <div className="frame-corner" style={{ backgroundImage: frameUrl("a"), transform: "scaleY(-1)" }}></div>
                <div className="frame-hori" style={{ backgroundImage: frameUrl("l"), transform: "scaleY(-1)" }}></div>
                <div className="frame-corner" style={{ backgroundImage: frameUrl("a"), transform: "scale(-1, -1)" }}></div>
            </div>
        </div >
    );
}