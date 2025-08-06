import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { useContext } from "react";

import { GlobalContext } from "../context/GlobalContext"
export default function DefaultLayout() {
    const { posts, setPosts, theme, setTheme } = useContext(GlobalContext)

    let url = ""
    let splitter = ""
    let bgcolor = ""

    switch (theme) {

        case "land":
            url = 'url("/textures/grass.png")';
            splitter = 'url("/splitter/fance.png")';
            bgcolor = "#72cca4"
            break;

        case "beach":
            url = 'url("/textures/sand.png")';
            splitter = 'url("/splitter/logs.png")';
            bgcolor = "#eae086"
            break;

        case "city":
            url = 'url("/textures/marciapiede.png")';
            splitter = 'url("/splitter/rail.png")';
            bgcolor = "#dee6e6"
            break;

        case "snow":
            url = 'url("/textures/snow.png")';
            splitter = 'url("/sprites/snowrock.png")';
            bgcolor = "#eeeef6"
            break;

    }

    return (
        <>
            <Header />
            <div className="flex" style={{
                backgroundImage: splitter,
                height: "16px",
                backgroundColor: bgcolor,
            }} ></div>
            <main className="flex p-10" style={{
                backgroundImage: url,
                height: theme === "snow" || theme === "land" ? "calc(100vh - 154px)" : "calc(100vh - 144px)"
            }}>

                <Outlet />

            </main >
            <div className="flex" style={{
                backgroundImage: splitter,
                height: theme === "snow" || theme === "land" ? "32px" : "16px",
                backgroundColor: bgcolor,
                backgroundRepeat: "repeat-X"
            }} ></div>
            <Footer />

        </>
    )
}