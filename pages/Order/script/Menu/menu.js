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
        menuFn(e.args[0], e.args[1], e.args[2], e.args[3], e.args[4], e.args[5], e.args[6], e.args[7]);
    });
});

menuListenerArr.forEach(e => {
    args.push(e.Vname);
});

orderNowBtn.addEventListener("click", () => {
    if (items.innerHTML != "0") {
        validateActive(args[0], args[1], args[2], args[3]);
    }
});
export let addBtn = document.querySelectorAll('.addBtn');