import { fillDataArr } from "../Data/fillData.js";
import { executeOrder } from "../Menu/order.js"
import { menuListenerArr } from "../Data/eventListeners.js";
import { fillingData } from "../functions/function.js";
import { menuFn } from "../functions/menuFunctions.js";

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
function read(menu, menuArr) {
    try {
        let objectStore = db.transaction(menu).objectStore(menu);
        objectStore.openCursor().onsuccess = function (e) {
            let cursor = (e.target.result);
            if (cursor) {

                if (menuArr.length > 0) {
                    let matched = false;
                    menuArr.forEach(e => {
                        if (e.name == cursor.value.name && e.type == cursor.value.type) {
                            // do nothing
                            matched = true;
                        }
                    });
                    if (!matched) {
                        menuArr.push({
                            name: cursor.value.name,
                            price: cursor.value.price,
                            type: cursor.value.type
                        });
                    }
                } else {
                    menuArr.push({
                        name: cursor.value.name,
                        price: cursor.value.price,
                        type: cursor.value.type
                    });
                }
                cursor.continue();
            } else {
                fillDataArr.forEach(e => {
                    fillingData(menuArr, e.item, e.img, e.imgName, e.menu);
                    e.item = "";
                });
                menuArr = [];
                executeOrder();
            }
        }
    } catch (e) {
        console.log(e);
        let deleteRequest = indexedDB.deleteDatabase('AminKababHouse');
        console.log(deleteRequest);
        deleteRequest.onsuccess = () => {
            location.reload();
            localStorage.setItem('reloaded', JSON.stringify(true));
        }
        deleteRequest.onerror = () => {
            location.reload();
            localStorage.setItem('reloaded', JSON.stringify(true));
        }
        deleteRequest.onblocked = () => {
            location.reload();
            localStorage.setItem('reloaded', JSON.stringify(true));
        }
    }
}
menuListenerArr.forEach(e => {
    let mn = e.menuName, mr = e.menuArr;
    e.Vname.addEventListener("click", () => {
        menuFn(...e.args);
        read(mn, mr);
    });
});

export let addBtn = document.querySelectorAll('.addBtn');