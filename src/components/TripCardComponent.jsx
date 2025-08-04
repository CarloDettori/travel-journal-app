import { useState } from "react";

export default function TripCardComponent() {

    const [frameNumber, setFrameNumber] = useState("1");
    const [frameEdge, setFrameEdge] = useState("a")

    var topedge = {
        backgroundImage: `url("/frames/frame${frameNumber}l.png")`
    };
    var topedge = {
        backgroundImage: `url("/frames/frame${frameNumber}l.png")`
    };

    return (
        <div className="card-wrapper">
            <div className="flex">
                <img src="/frames/frame1a.png" alt="f1" />
                <div className="frame" style={{ topedge }}></div>
                <img src="/frames/frame1a.png" alt="f3" />
            </div>
            <div className="flex">
                <div className="frame" style={{ sectionStyle }}></div>
                <div>-f5-</div>
                <div className="frame" style={{ sectionStyle }}></div>
            </div>
            <div className="flex">
                <img src="/frames/frame1a.png" alt="f7" />
                <div className="frame" style={{ sectionStyle }}></div>
                <img src="/frames/frame1a.png" alt="f9" />
            </div>
        </div>
    )
}