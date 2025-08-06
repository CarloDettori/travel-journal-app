
import { useContext } from "react";

import { GlobalContext } from "../context/GlobalContext"


export default function Footer() {
    const { posts, setPosts, theme, setTheme } = useContext(GlobalContext)


    let edge = ""
    let texture = ""


    switch (theme) {

        case "land":
            edge = 'url("/edges/grass-sand.png")';
            texture = 'url("/textures/sand.png")';
            break;

        case "beach":
            edge = 'url("/edges/sand-water.png")';
            texture = 'url("/textures/water2.png")';
            break;

        case "city":
            edge = 'url("/edges/marciapiede-grass.png")';
            texture = 'url("/textures/grass.png")';
            break;

        case "snow":
            edge = 'url("/edges/grownd-water.png")';
            texture = 'url("/textures/water.png")';
            break;
    }


    return (
        <>
            <div id="footertop" style={{
                backgroundImage: edge,
                height: "8px"
            }}></div >
            <footer style={{
                backgroundImage: texture,
                height: "32px"
            }}>

            </footer >

        </>
    )
}