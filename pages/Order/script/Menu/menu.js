import { fillDataArr } from "../Data/fillData.js";
import { executeOrder } from "../Menu/order.js"
import { menuListenerArr } from "../Data/eventListeners.js";
import { fillingData } from "../functions/function.js";
import { menuFn } from "../functions/menuFunctions.js";
import { testing101 } from "../functions/IndexedDBfn.js"
if (!window.indexedDB) {
    window.alert(
        "Your browser doesn't support a stable version of IndexedDB."
    );
}
let db, request = window.indexedDB.open("AminKababHouse", 2);
request.onsuccess = function (e) {
    db = request.result;
    console.log("success", db);
    if (JSON.parse(localStorage.getItem("DataBaseBuilt"))) {
        document.querySelector(".menu1").click();

    }
    if (JSON.parse(localStorage.getItem('reloaded'))) {
        localStorage.removeItem('reloaded');
        window.location.href = "../../index.html";

    }
};

testing101(menuListenerArr, executeOrder, true, false, false);
// export function testing101(arr, cb) {
//     arr.forEach(e => {
//         let mn = e.menuName, mr = e.menuArr;
//         e.Vname.addEventListener("click", () => {
//             menuFn(...e.args);
//             read(mn, mr, cb);
//         });
//     });
// }


export let addBtn = document.querySelectorAll('.addBtn');