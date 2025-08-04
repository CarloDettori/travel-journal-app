import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
export default function DefaultLayout() {


    return (
        <>
            <Header />
            <main className="flex p-10">



                <Outlet />

            </main >
            <Footer />
        </>
    )
}