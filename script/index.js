import { tables } from "../pages/Order/script/Data/tables.js";
let orderArray = localStorage.getItem('takeAway')
    ? JSON.parse(localStorage.getItem('takeAway'))
    : [],
    tableOrder = localStorage.getItem('tableOrder') ?
        JSON.parse(localStorage.getItem('tableOrder')) : [];
sessionStorage.setItem("tableClick", "");
let takeAwayPrint = localStorage.getItem('takeAwayPrint') ?
    JSON.parse(localStorage.getItem('takeAwayPrint')) : [];

let orders = document.querySelector("#orders"), reservedList = document.querySelector(".reservedList"),
    reservedTable = document.querySelectorAll(".reservedTable"), modal = document.querySelector(".modal"), modalw = document.querySelector(".modal-wrap"),
    updateBtn = document.querySelector(".updateBtn"), invoiceBtn = document.querySelector(".invoiceBtn"), closeBtn = document.querySelector(".closeBtn"),
    backBtn = document.querySelector(".backBtn"),
    invoicep = document.querySelector(".invoicep"), billInvoice = document.querySelector(".billInvoice"),
    invoiceTfoot = document.querySelector(".invoiceTfoot"), invoicepTfoot = document.querySelector(".invoicepTfoot"),
    salesTable = document.querySelector(".main"), cashrcvd = "", cashReturn = "",
    printBtns = document.querySelector(".printBtns"), printInfo = document.querySelector(".printInfo"),
    printBtn = document.querySelector(".printBtn"), enterBtn = document.querySelector(".enterBtn"),
    clearBtn = document.querySelector(".clearBtn"), downloadBtn = document.querySelector(".downloadBtn"),
    clearSalesBtn = document.querySelector(".clearSalesBtn"), homeTable = document.querySelector(".homeTable"),
    dineIn = document.querySelector("#dineIn"), takeAway = document.querySelector("#takeAway"),
    serviceTax = document.querySelector(".serviceTax"),
    yesBtn = document.querySelector(".yesBtn"), noBtn = document.querySelector(".noBtn"),
    msg = document.querySelector(".msg"),
    rows = "", item = "", tableClick = false, orderId = 1, totalAmount = 0, tax = 0;
console.log(takeAwayPrint);
console.log(orderArray);
dineIn.addEventListener("click", () => {
    sessionStorage.setItem("DineInClicked", JSON.stringify(true));
});
takeAway.addEventListener("click", () => {
    sessionStorage.setItem("TakeAwayClicked", JSON.stringify(true));
});

let invoice = [];
let amount = document.querySelectorAll('.amount'), total = document.querySelector('.total');
let db, objectStore, request = window.indexedDB.open("AminKababHouse", 2);
request.onsuccess = function () {
    db = request.result;
    console.log("success", db);
    objectStore = db.transaction("serviceTax").objectStore("serviceTax");
    let req = objectStore.openCursor();
    req.onsuccess = function (e) {
        console.log(objectStore);

        let cursor = e.target.result;
        if (cursor) {
            tax += Number(cursor.value.service);
            cursor.continue();
        } else {
            if (tax == 0) {
                serviceTax.innerHTML = 0;
            } else {
                serviceTax.innerHTML = tax;
            }
        }
    }
    objectStore = db.transaction("invoice").objectStore("invoice");
    req = objectStore.openCursor();
    req.onsuccess = function (e) {
        let cursor = e.target.result;
        if (cursor) {
            // console.log(cursor);
            if (cursor.value.takeAway != undefined) {
                invoice.push(cursor.value.takeAway)
            }
            if (cursor.value.table != undefined) {
                invoice.push(cursor.value.table)
            }
            cursor.continue();
        } else {
            console.log(invoice);
            invoice.forEach(e => {
                let str = "Take Away", total = 0;

                e.forEach(e => {
                    console.log(e.itemName);
                    if (Number(e.tableNo)) {
                        str = "Table " + e.tableNo;
                    } else {
                        str = "TakeAway";
                    }
                    total += Number(e.total);
                    console.log(total);
                });
                rows += `<tr>
                <td class="orderID">#${orderId}</td>
              <td>
                ${str}
              </td>
              <td class="amount">${total}</td>
              </tr>`;
                orderId++;

            })
            orders.innerHTML = rows;
            homeTable.scrollTo(0, homeTable.scrollHeight);
            amount = document.querySelectorAll(".amount");
            amount.forEach(e => {
                totalAmount += Number(e.innerHTML);
            });
            if (totalAmount) {
                total.innerHTML = totalAmount;
            }

        }
    }
}
clearBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    modalw.classList.add("printClicked")
    modalw.classList.add("pressedBtn");
    yesBtn.classList.add("clearService");
    msg.innerHTML = 'Do you want to clear Service Tax?';
});
clearSalesBtn.addEventListener("click", () => {
    modal.style.display = "flex";
    modalw.classList.add("printClicked")
    modalw.classList.add("pressedBtn");
    yesBtn.classList.add("clearSales");
    msg.innerHTML = 'Do you want to clear Sales Table?';

});
yesBtn.addEventListener("click", () => {

    if (yesBtn.classList.contains("clearService")) {
        yesBtn.classList.remove("clearService");
        let transaction = db.transaction(["serviceTax"], "readwrite");
        transaction.oncomplete = function (event) {
            console.log('Transaction completed.');
        };
        transaction.onerror = function (event) {
            alert('Transaction not opened due to error: ' + transaction.error);
        };
        let objectStore = transaction.objectStore("serviceTax");
        let objectStoreRequest = objectStore.clear();
        objectStoreRequest.onsuccess = function (event) {
            modalw.classList.remove("pressedBtn");
            modal.style.display = "none";
            alert('Service Tax is Cleared.');
            location.reload();
        };
    }
    if (yesBtn.classList.contains("clearSales")) {
        yesBtn.classList.remove("clearSales");

        let transaction = db.transaction(["invoice"], "readwrite");
        transaction.oncomplete = function (event) {
            console.log('Transaction completed.');
        };
        transaction.onerror = function (event) {
            alert('Transaction not opened due to error: ' + transaction.error);
        };
        let objectStore = transaction.objectStore("invoice");
        let objectStoreRequest = objectStore.clear();
        objectStoreRequest.onsuccess = function (event) {
            modalw.classList.remove("pressedBtn");
            modal.style.display = "none";
            alert('Service Tax is Cleared.');
            location.reload();
        };
    }

});
noBtn.addEventListener("click", () => {
    modalw.classList.remove("pressedBtn");
    modal.style.display = "none";
    if (yesBtn.classList.contains("clearSales")) {
        yesBtn.classList.remove("clearSales");
    }
    if (yesBtn.classList.contains("clearService")) {
        yesBtn.classList.remove("clearService");
    }
});
closeBtn.addEventListener("click", () => {

    modalw.classList.remove("pressedBtn");

    modal.style.display = "none";
});

tables.forEach(e => {
    if (e.reserved == true) {
        item += `<li class="reservedTable" >Table ${e.tableNo}</li>`;
    }
});
if (item && reservedList) {
    reservedList.innerHTML = item;
}

reservedTable = document.querySelectorAll(".reservedTable");

reservedTable.forEach(e => {
    e.addEventListener("click", () => {
        let tableNum = e.innerHTML;
        tableNum = Number(tableNum.substr(-2));
        tableClick = {
            tableClicked: true,
            tableNo: tableNum
        }
        sessionStorage.setItem("tableClick", JSON.stringify(tableClick));
        window.location.href = "pages/Order/order.html";
    });
});
