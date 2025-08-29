import FrameComponent from "../components/common/FrameComponent"
import { Link } from "react-router-dom"
export default function HomePge() {


    return (
        <section className="text-center overflow-scroll">
            <p className="text-2xl pb-4">BENVENUTO NEL TUO</p>
            <p className="text-6xl pb-5">TRAVEL JOURNAL</p>
            <FrameComponent>
                <p className="p-10">
                    qui potrai tenere traccia di tutti i tuoi viaggi! <br /> <br />
                    Ogni viaggio mostra il livello <img className="inline pe-1" src="/hud/1bar.png" alt="" />basso o <img className="inline pe-1" src="/hud/5bar.png" alt="" />alto di impegno fisico, economico e il "$"prezzo effettivo del viaggio <br /><br />
                    Per ogni viaggio veranno inoltre visualizzatte tutte le tappe del con i rispettivi <img className="inline pe-1" src="/emoticon/004-smile.png" alt="" />pro e <img className="inline pe-1" src="/emoticon/022-sad.png" alt="" />contro. <br /><br />Ogni tappa inoltre potrà avere i suoi eventi. <br /><br /> Ogni evento contiene i vari momenti dell'evento in cui verranno visualizzate le tue foto i tuoi video i tuoi #tag
                </p>
            </FrameComponent>
            <br />
            <Link className="ms-auto bg-[#4a5566] p-2 text-white rounded-lg text-xs" to={`/trips`}>I TUOI VIAGGI</Link>

        </section>
    )
}