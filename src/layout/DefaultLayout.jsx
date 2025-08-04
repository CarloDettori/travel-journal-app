import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
export default function DefaultLayout() {


    return (
        <>
            <Header />
            <main className="flex p-10">



                <Outlet />

            </main >
        </>
    )
}