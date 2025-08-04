import { NavLink, Link } from "react-router-dom";
import logo from "/public/sprites/stone.png"


export default function Header() {


    return (
        <>
            <header className="flex">
                <Link to="/" className="my-auto ml-2">
                    <img id="logo" src={logo} alt="logoIMG" />
                </Link>
                <nav className="flex pl-8 gap-10 text-lg items-center">


                    <NavLink className="navlink" to="/trips"><strong>VIAGGI</strong></NavLink>

                    <NavLink className="navlink" to="/tripsphotos"><strong >FOTOGRAFIE</strong></NavLink>

                </nav>

            </header >
            <div id="headerbottom"></div>
        </>
    )
}