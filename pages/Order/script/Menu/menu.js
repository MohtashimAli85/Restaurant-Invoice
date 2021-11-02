import { fillDataArr } from "../Data/fillData.js";
import { menuListenerArr } from "../Data/eventListeners.js";
import { validateActive, fillingData } from "../functions/function.js";
import { menuFn } from "../functions/menuFunctions.js"

let orderNowBtn = document.querySelector(".orderNow");
let items = document.querySelector(".items");
let args = [];

fillDataArr.forEach(e => {
    fillingData(e.Vname, e.item, e.img, e.imgName, e.menu);
    e.Vname.innerHTML = e.item;
    e.item = "";
});

menuListenerArr.forEach(e => {
    e.Vname.addEventListener("click", () => {
        menuFn(...e.args)
    });
});

menuListenerArr.forEach(e => {
    args.push(e.Vname);
});

orderNowBtn.addEventListener("click", () => {
    if (items.innerHTML != "0") {
        validateActive(...args);
    }
});
export let addBtn = document.querySelectorAll('.addBtn');