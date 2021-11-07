import { fillDataArr } from "../Data/fillData.js";
import { muttonMenu } from "../Data/mutton.js";
import { chickenMenu } from '../Data/chicken.js';
import { drinksMenu } from '../Data/drinks.js';
import { sideOrderMenu } from '../Data/sideOrder.js';
import { executeOrder } from "../Menu/order.js"
import { menuListenerArr, muttonDB } from "../Data/eventListeners.js";
import { validateActive, fillingData } from "../functions/function.js";
import { menuFn } from "../functions/menuFunctions.js"
let orderNowBtn = document.querySelector(".orderNow");
let items = document.querySelector(".items");
let args = [], filled = false;

// fillDataArr.forEach(e => {
//     fillingData(e.Vname, e.item, e.img, e.imgName, e.menu);
//     e.Vname.innerHTML = e.item;
//     e.item = "";
// });
// window.IDBTransaction =
//     window.IDBTransaction ||
//     window.webkitIDBTransaction ||
//     window.msIDBTransaction;
// window.IDBKeyRange =
//     window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
if (!window.indexedDB) {
    window.alert(
        "Your browser doesn't support a stable version of IndexedDB."
    );
}
let db, request = window.indexedDB.open("AminKababHouse", 2);
request.onupgradeneeded = function (e) {

    let db = request.result;
    switch (e.oldVersion) {
        case 0:
            let objectStore = db.createObjectStore("chicken", { keyPath: "id" });
            chickenMenu.forEach(e => {
                objectStore.add(e);
            });
            objectStore = db.createObjectStore("sideOrder", { keyPath: "id" });
            sideOrderMenu.forEach(e => {
                objectStore.add(e);
            });
            objectStore = db.createObjectStore("drinks", { keyPath: "id" });
            drinksMenu.forEach(e => {
                objectStore.add(e);
            });
            objectStore = db.createObjectStore("mutton", { keyPath: "id" });
            muttonMenu.forEach(e => {
                objectStore.add(e);
            });
            break;
        case 1:
            console.log("its 1!");
            break;
        case 2:
            console.log("its 2");
            break;
    }
}
request.onsuccess = async function (e) {
    db = request.result;
    console.log("success", db);
    document.querySelector(".menu1").click();

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
    }
}
menuListenerArr.forEach(e => {
    let mn = e.menuName, mr = e.menuArr;
    e.Vname.addEventListener("click", () => {
        menuFn(...e.args);
        read(mn, mr);
    });
});
if (document.querySelector(".menu1")) {
    document.querySelector(".menu1").click();
}
menuListenerArr.forEach(e => {
    args.push(e.Vname);
});

orderNowBtn.addEventListener("click", () => {
    if (items.innerHTML != "0") {
        validateActive(...args);
    }
});
export let addBtn = document.querySelectorAll('.addBtn');