import { fillDataArr } from '../Data/fillData.js';
// import { fillingData } from './function.js';
import { menuFn } from './menuFunctions.js';
// import { read } from '../Menu/menu.js';
export function crud(arr, cb, add, update, del) {

    arr.forEach(e => {
        let mn = e.menuName, mr = e.menuArr;
        e.Vname.addEventListener("click", () => {
            menuFn(...e.args);
            read(mn, mr, cb, add, update, del);
        });
    });
}
let db, request = window.indexedDB.open("AminKababHouse", 2);
request.onsuccess = function (e) {
    db = request.result;
    console.log("success", db);
    // if (JSON.parse(localStorage.getItem("DataBaseBuilt"))) {
    //     document.querySelector(".menu1").click();

    // }
    // if (JSON.parse(localStorage.getItem('reloaded'))) {
    //     localStorage.removeItem('reloaded');
    //     window.location.href = "../../index.html";

    // }
};
function read(menu, menuArr, callBack, add, update, del) {
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
                    fillingData(menuArr, e.item, e.img, e.imgName, e.menu, add, update, del);
                    e.item = "";
                });
                menuArr = [];
                callBack('indexedDBfn sae call ho rhi');
            }
        }
    } catch (e) {
        console.log(e);
        let deleteRequest = indexedDB.deleteDatabase('AminKababHouse');
        console.log(deleteRequest);
        deleteRequest.onsuccess = () => {
            // location.reload();
            localStorage.setItem('reloaded', JSON.stringify(true));
        }
        deleteRequest.onerror = () => {
            // location.reload();
            localStorage.setItem('reloaded', JSON.stringify(true));
        }
        deleteRequest.onblocked = () => {
            // location.reload();
            localStorage.setItem('reloaded', JSON.stringify(true));
        }
    }
}
function fillingData(Vname, item, img, imgName, menu, add, update, del) {
    Vname.forEach(e => {
        item += dataProvider(e.name, e.type, e.price, img, imgName, add, update, del);
    });
    menu.innerHTML = item;
    item = "";
}
function dataProvider(name, type, price, img, imgName, add, update, del) {
    let updated = update ? `<img src="../../assets/crud-updateIcon-active.png" alt="update icon" class="updateBtn crudIcon">` : '',
        dele = del ? `<img src="../../assets/crud-delIcon-active.png" alt="del icon" class="delBtn crudIcon">` : '',
        added = add ? ` <img src="../../assets/add-icon.svg" alt="add icon" class="addIcon addBtn"> ` : '';
    console.log(added);
    return (`<div class="item d-flex">
    <div class="d-flex v-center">
        <img src="../../assets/${img}.png" alt="${imgName} img">
        <div>
        <h6>${name} <span>(${type})</span></h6>
        <p>Rs.${price}</p>
        </div>
    </div>
     ${updated}${dele}${added}
    
  </div>`)
};