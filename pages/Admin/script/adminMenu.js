import { adminMenuListenerArr } from "../../Order/script/Data/eventListeners.js";
import { menuFn } from "../../Order/script/functions/menuFunctions.js";
let name = document.getElementById('name');
let price = document.getElementById('price');
let type = document.getElementById('type');
sessionStorage.setItem("updateClick", "");
sessionStorage.setItem("tableClick", "");

let submitBtn = document.getElementById('submitBtn');
adminMenuListenerArr.forEach(e => {
    e.Vname.addEventListener("click", () => {
        menuFn(e.args[0], e.args[1], e.args[2], e.args[3], e.args[4], e.args[5], e.args[6], e.args[7]);

    });
});

document.querySelector(".amenu1").click();
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
    let transaction = db.transaction(selectedDB, "readwrite"); // (1)

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
            console.log("Error", request.error);
        };
    }


});


function getSelectedMenu(menu) {
    if (menu.classList.contains("active")) {
        return menu.children[1].innerHTML;
    }
}