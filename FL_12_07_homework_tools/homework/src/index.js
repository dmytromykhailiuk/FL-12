import calc from "./js/calc";
import log from "./js/log";

import img from "./img/Rock-paper-scissors.png";
import "./scss/main.scss";

log(calc( 3, 6, 7, 1 ));

const el = document.createElement('img');
el.src = img;
document.body.appendChild(el);