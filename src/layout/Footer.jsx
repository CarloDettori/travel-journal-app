
import { useContext } from "react";

import { GlobalContext } from "../context/GlobalContext"


export default function Footer() {
    const { posts, setPosts, theme, setTheme } = useContext(GlobalContext)


    let edge = ""
    let texture = ""


    switch (theme) {

        case 1:
            edge = 'url("/edges/grass-sand.png")';
            texture = 'url("/textures/sand.png")';
            break;

        case 2:
            edge = 'url("/edges/sand-water.png")';
            texture = 'url("/textures/water2.png")';
            break;

        case 3:
            edge = 'url("/edges/marciapiede-grass.png")';
            texture = 'url("/textures/grass.png")';
            break;

        case 4:
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
                <div onClick={e => { e.preventDefault(); e.stopPropagation() }} className="flex justify-center items-center pt-1 pb-2">
                    {theme === 1 ?
                        <img style={{ transform: "scaleX(-1)" }} className="px-1 cursor-pointer" onClick={() => { setTheme(4) }} src="/hud/arrow-right.png" alt="" />
                        :
                        <img style={{ transform: "scaleX(-1)" }} className="px-1 cursor-pointer" onClick={() => { setTheme(theme - 1) }} src="/hud/arrow-right.png" alt="" />}

                    <p className=" text-center w-20 text-sm ps-1 ">
                        {theme === 1 ? "prato" : ""}
                        {theme === 2 ? "spiaggia" : ""}
                        {theme === 3 ? "città" : ""}
                        {theme === 4 ? "ghiaccio" : ""}
                    </p>

                    {theme === 4 ?
                        <img className="px-1 cursor-pointer" onClick={(e) => { setTheme(1) }} src="/hud/arrow-right.png" alt="" />
                        :
                        <img className="px-1 cursor-pointer" onClick={(e) => { setTheme(theme + 1) }} src="/hud/arrow-right.png" alt="" />}
                </div>
            </footer >

        </>
    )
}