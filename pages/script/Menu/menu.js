import { muttonMenu } from "../Data/mutton.js";
import { chickenMenu } from "../Data/chicken.js";
import { sideOrderMenu } from "../Data/sideOrder.js";
import { validateActive, menuFn, fillingData } from "./function.js";
import { } from "./test.js";
const menuOne = document.querySelector(".menu1");
const menuTwo = document.querySelector(".menu2");
const menuThree = document.querySelector(".menu3");
const menuFour = document.querySelector(".menu4");

const mutton = document.getElementById("mutton");
const chicken = document.getElementById("chicken");
const drinks = document.getElementById("drinks");
const sideOrder = document.getElementById("sides");

let item = "";
let orderNowBtn = document.querySelector(".orderNow");
let items = document.querySelector(".items");
let fillDataArr = [
    {
        Vname: muttonMenu,
        item: item,
        img: "rack-of-lamb",
        imgName: "mutton",
        menu: mutton
    }
];
fillingData(muttonMenu, item, "rack-of-lamb", "mutton", mutton);
// muttonMenu.forEach((e) => {
//     item += dataProvider(e.name, e.type, e.price, "rack-of-lamb", "mutton");
// });
// mutton.innerHTML = item;
// item = "";
// chickenMenu.forEach((e) => {
//     item += dataProvider(e.name, e.type, e.price, "chicken-leg", "chicken");

// });
// chicken.innerHTML = item;
// item = "";

// sideOrderMenu.forEach((e) => {
//     item += dataProvider(e.name, e.type, e.price, "menu", "sideOrder")
// });
// sideOrder.innerHTML = item;
// item = "";

menuOne.addEventListener("click", () => {
    menuFn(menuTwo, "#menu2", menuThree, "#menu3", menuFour, "#menu4", menuOne, "#menu1"
    );
});
menuTwo.addEventListener("click", () => {
    menuFn(menuOne, "#menu1", menuThree, "#menu3", menuFour, "#menu4", menuTwo, "#menu2");
});
menuThree.addEventListener("click", () => {
    menuFn(menuOne, "#menu1", menuTwo, "#menu2", menuFour, "#menu4", menuThree, "#menu3");
});

menuFour.addEventListener("click", () => {
    menuFn(menuOne, "#menu1", menuTwo, "#menu2", menuThree, "#menu3", menuFour, "#menu4");
});
orderNowBtn.addEventListener("click", () => {
    if (items.innerHTML != "0") {
        validateActive(menuOne, menuTwo, menuThree, menuFour);
    }
});

export let addBtn = document.querySelectorAll('.addBtn');