import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";

import { GlobalContext } from "../context/GlobalContext"

export default function Header() {


    const { posts, setPosts, theme, setTheme } = useContext(GlobalContext)
    let logo = ""
    let texture = ""
    let edge = ""


    switch (theme) {
        case 1:
            texture = 'url("/textures/water.png")';
            edge = 'url("/edges/grownd-water-up.png")';
            logo = "/public/sprites/ship.png"
            break;
        case 2:
            texture = 'url("/textures/pontile.png")';
            edge = 'url("/edges/pontile-base.png")';
            logo = "/public/sprites/bike1.png"
            break;
        case 3:
            texture = 'url("/textures/road.png")';
            edge = 'url("/edges/marciapiede-road.png")';
            logo = "/public/sprites/truck.png"
            break;
        case 4:
            texture = 'url("/textures/ice.png")';
            edge = 'url("/edges/water-snow-up.png")';
            logo = "/public/sprites/boat.png"
            break;
    }

    return (
        <>
            <header className="flex px-3 py-2 " style={{ backgroundImage: texture }}>
                <Link to="/" className="flex items-center" >
                    <img src={logo} className="img-natural" alt="logoIMG" />
                </Link>
                <nav className="flex px-8 gap-10 text-lg items-center justify-evenly w-full">


                    <NavLink className="navlink" to="/trips"><strong>VIAGGI</strong></NavLink>

                    {/* <NavLink className="navlink" to="/tripsphotos"><strong >FOTOGRAFIE</strong></NavLink> */}

                </nav>

                <Link to="/" className="flex items-center" >
                    <img src={logo} style={{ transform: "scaleX(-1)" }} className="img-natural" alt="logoIMG" />
                </Link>

            </header >
            <div id="headerbottom" style={{
                backgroundImage: edge,
                height: "8px"
            }}></div>
        </>
    )
}