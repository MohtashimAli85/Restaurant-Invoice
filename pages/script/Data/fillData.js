import { muttonMenu } from "./mutton.js";
import { chickenMenu } from "./chicken.js";
import { sideOrderMenu } from "./sideOrder.js";
let item = "";
const mutton = document.getElementById("mutton"),
    chicken = document.getElementById("chicken"),
    drinks = document.getElementById("drinks"),
    sideOrder = document.getElementById("sides");
export let fillDataArr = [
    {
        Vname: muttonMenu,
        item: item,
        img: "rack-of-lamb",
        imgName: "mutton",
        menu: mutton
    }, {
        Vname: chickenMenu,
        item: item,
        img: "chicken-leg",
        imgName: "chicken",
        menu: chicken
    }, {
        Vname: sideOrderMenu,
        item: item,
        img: "menu",
        imgName: "sideOrder",
        menu: sideOrder
    }
];
