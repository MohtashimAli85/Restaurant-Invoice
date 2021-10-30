import { adminMenuListenerArr } from "../../Order/script/Data/eventListeners.js";
import { menuFn } from "../../Order/script/functions/menuFunctions.js";

let adminInputs = document.querySelector(".admin_inputs");
adminMenuListenerArr.forEach(e => {
    let menu = e.Vname;
    e.Vname.addEventListener("click", () => {
        menuFn(e.args[0], e.args[1], e.args[2], e.args[3], e.args[4], e.args[5], e.args[6], e.args[7]);

    });
});

document.querySelector(".amenu1").click();