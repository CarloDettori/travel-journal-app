export default function BarrComponent({ n }) {

    let barr = null

    switch (n) {

        case 1:
            barr = "/hud/1bar.png"
            break;

        case 2:
            barr = "/hud/2bar.png"
            break;

        case 3:
            barr = "/hud/3bar.png"
            break;

        case 4:
            barr = "/hud/4bar.png"
            break;

        case 5:
            barr = "/hud/5bar.png"
            break;
    }

    return <img className="img-natural my-auto" src={barr} alt="barr" />

}