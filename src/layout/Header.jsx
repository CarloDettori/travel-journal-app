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
            logo = "/sprites/ship.png"
            break;
        case 2:
            texture = 'url("/textures/pontile.png")';
            edge = 'url("/edges/pontile-base.png")';
            logo = "/sprites/bike1.png"
            break;
        case 3:
            texture = 'url("/textures/road.png")';
            edge = 'url("/edges/marciapiede-road.png")';
            logo = "/sprites/truck.png"
            break;
        case 4:
            texture = 'url("/textures/ice.png")';
            edge = 'url("/edges/water-snow-up.png")';
            logo = "/sprites/boat.png"
            break;
    }

    return (
        <>
            <header className="flex px-3 py-2 " style={{ backgroundImage: texture }}>
                <Link to="/" className="flex items-center" >
                    <img src={logo} className="img-natural" alt="logoIMG" />
                </Link>
                <nav className="flex flex-wrap text-lg items-center justify-center gap-10 w-full">


                    {theme === 3 ? <NavLink className="navlink text-center p-1 bg-[#515a63] text-white rounded-lg " to="/trips"><strong className="block w-full text-center">VIAGGI</strong></NavLink> : <NavLink className="navlink text-center" to="/trips"><strong className="block w-full text-center">VIAGGI</strong></NavLink>}

                    {theme === 3 ? <NavLink className="navlink  text-center p-1 bg-[#515a63] text-white rounded-lg " to="/media"><strong className="block w-full text-center">FOTO E VIDEO</strong  ></NavLink> : <NavLink className="navlink" to="/media"><strong className="block w-full text-center">FOTO E VIDEO</strong></NavLink>}

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