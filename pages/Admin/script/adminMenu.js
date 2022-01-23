import { adminMenuListenerArr, adminCRUDList, updateCrud, addCrud, delCrud } from "../../Order/script/Data/eventListeners.js";
import { menuFn, crudfn } from "../../Order/script/functions/menuFunctions.js";
import { testing101 } from '../../Order/script/functions/IndexedDBfn.js';
let name = document.getElementById('name');
let price = document.getElementById('price');
let type = document.getElementById('type');
let menuGrid = document.querySelectorAll('.menuGrid');
let updateActive = document.querySelector('.update-active');
sessionStorage.setItem("updateClick", "");
sessionStorage.setItem("tableClick", "");

let submitBtn = document.getElementById('submitBtn');
adminCRUDList.forEach(e => {
    e.Vname.addEventListener("click", () => {
        crudfn(...e.args);
        if (e.Vname == updateCrud) {
            crudOperations(adminMenuListenerArr, consoles, false, true, false, false);
        }
        if (e.Vname == addCrud) {
            console.log('add');
            attribute('crud-add', true);
        }
        if (e.Vname == delCrud) {
            crudOperations(adminMenuListenerArr, consoles, false, false, true, false);
        }
    });

});
function crudOperations(arr, cb, val_1, val_2, val_3, val_4) {
    testing101(arr, cb, val_1, val_2, val_3);
    attribute('crud-add', val_4);
    document.querySelector('.amenu1').click();
}
function attribute(attr, val) {
    menuGrid.forEach(e => {
        e.setAttribute(attr, val);
    });
}
function consoles(arg) {
    console.log(arg + 'L lo')
}
adminMenuListenerArr.forEach(e => {
    e.Vname.addEventListener("click", () => {
        menuFn(...e.args);
    });
});

// document.querySelector(".amenu1").click();
let db, request = window.indexedDB.open("AminKababHouse", 2);
request.onsuccess = function (e) {
    db = request.result;
    console.log("success", db);
};
submitBtn.addEventListener("submit", (e) => {
    e.preventDefault();
    let selectedDB = "";
    adminMenuListenerArr.forEach(e => {
        if (e.Vname.classList.contains('active')) {
            selectedDB = e.Vname.children[1].innerHTML;
            selectedDB = selectedDB.toLowerCase();
            if (selectedDB == 'sides') {
                selectedDB = 'sideOrder';
            }
        }
    });
    console.log(selectedDB);
    let transaction = '';
    if (selectedDB.length > 0) {
        transaction = db.transaction(selectedDB, "readwrite");
    }
    else {
        alert('Kindly select category');
    } // (1)
    // get an object store to operate on it
    let items = transaction.objectStore(selectedDB); // (2)
    let countReq = items.count(), count = 0, result; //
    countReq.onsuccess = () => {
        count = countReq.result;
        let newItem = {
            id: count + 1,
            name: name.value,
            price: Number(price.value),
            type: type.value,
        };
        request = items.add(newItem); // (3)
        request.onsuccess = function () { // (4)
            alert(`New Item added to the ${selectedDB.toUpperCase()}`, request.result);
            name.value = ""; price.value = ""; type.value = "";
        };

        request.onerror = function () {
            alert(`Error`);
            console.log("Error", request.error);
        };
    }


});


function getSelectedMenu(menu) {
    if (menu.classList.contains("active")) {
        return menu.children[1].innerHTML;
    }
}