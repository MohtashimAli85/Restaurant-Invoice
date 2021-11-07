import { tables } from "../pages/Order/script/Data/tables.js";
import { fillPrintData } from "./printdata.js";
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
    backBtn = document.querySelector(".backBtn"), invoice = document.querySelector(".invoice"),
    invoicep = document.querySelector(".invoicep"), billInvoice = document.querySelector(".billInvoice"),
    invoiceTfoot = document.querySelector(".invoiceTfoot"), invoicepTfoot = document.querySelector(".invoicepTfoot"),
    salesTable = document.querySelector(".main"), cashrcvd = "", cashReturn = "",
    printBtns = document.querySelector(".printBtns"),
    printBtn = document.querySelector(".printBtn"), enterBtn = document.querySelector(".enterBtn"),
    rows = "", item = "", tableClick = false, orderId = 1, totalAmount = 0, serviceTax = 0;
console.log(takeAwayPrint);
if (orderArray.length != 0) {
    orderArray.forEach(e => {
        rows += `<tr>
        <td class="orderID">#${orderId}</td>
              <td>
                ${e.description}
              </td>
              <td class="amount">${e.amount}</td>
              </tr>`;
        orderId++;
    })
    orders.innerHTML = rows;
}
if (takeAwayPrint.length != 0) {
    item = ""; totalAmount = 0;
    fillPrintData(takeAwayPrint, invoice, invoicep, invoiceTfoot, invoicepTfoot, "takeAway");
    printBtns.classList.add("d-flexi");
    cashrcvd = document.querySelector(".cashrcvd");
    cashReturn = document.querySelector(".cashReturn");
    cashrcvd.contentEditable = true;
    localStorage.setItem("takeAwayPrint", "");
    billInvoice.style.display = "block";
    salesTable.style.display = "none";
    item = "";
}
let amount = document.querySelectorAll('.amount'), total = document.querySelector('.total');
amount.forEach(e => {
    totalAmount += Number(e.innerHTML);
});
if (totalAmount) {
    total.innerHTML = totalAmount;
}
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
        modal.style.display = 'flex';
        modalw.classList.add("pressedBtn");
        sessionStorage.setItem("tableClick", JSON.stringify(tableClick));
    });
});

closeBtn.addEventListener("click", () => {
    tableClick = "";
    sessionStorage.setItem("tableClick", "");
    modalw.classList.remove("pressedBtn");
    modal.style.display = "none";
    salesTable.style.display = "block";

});

updateBtn.addEventListener("click", () => {
    let updateClick = true;
    sessionStorage.setItem("updateClick", JSON.stringify(updateClick));
    window.location.href = "pages/Order/order.html";
});
invoiceBtn.addEventListener("click", () => {
    sessionStorage.setItem("tableClick", "");
    let tableOrderItem = [];
    billInvoice.style.display = "block";
    item = "";
    if (tableOrder) {
        tableOrder.forEach(e => {
            if (e.tableNum == tableClick.tableNo) {
                e.description.forEach(e => {
                    tableOrderItem.push(e);
                });
            }
        });
    }
    if (tableOrderItem) {
        salesTable.style.display = "none";
        fillPrintData(tableOrderItem, invoice, invoicep, invoiceTfoot, invoicepTfoot, "tableOrder");
        modal.style.display = "none";
        printBtns.classList.add("d-flexi");
        cashrcvd = document.querySelector(".cashrcvd");
        cashReturn = document.querySelector(".cashReturn");
        cashrcvd.contentEditable = true;
    }
});
backBtn.addEventListener("click", () => {
    billInvoice.style.display = "none";
    salesTable.style.display = "block";
    printBtns.classList.remove("d-flexi");
});
enterBtn.addEventListener("click", () => {
    cashrcvd = document.querySelector(".cashrcvd");
    let cashRcvd = Number(cashrcvd.innerHTML);
    let totalAmount = Number(document.querySelector(".tkta").innerHTML);

    if (cashRcvd) {
        if (cashRcvd < totalAmount) {
            alert("Kindly Enter Valid Received Cash");
            // cashrcvd.innerHTML = "";
            enterCash('', '', "", '');
        } else {
            let rs = cashRcvd - totalAmount;
            enterCash('none', rs, 'remove', cashRcvd);
        }
    } else {
        console.log(cashRcvd);
        enterCash('', "", '', '');
        alert("Enter Received Cash");
    }
});
printBtn.addEventListener("click", () => {
    window.print();
});

function enterCash(borderVal, rs, cmd, cash) {
    let cashrcvd = document.querySelectorAll(".cashrcvd"),
        cashReturn = document.querySelectorAll(".cashReturn");
    cashrcvd.forEach(e => {
        e.innerHTML = cash;
        if (cmd == "remove") {
            e.parentNode.classList.remove("border-focus");
        } else {
            e.parentNode.classList.add("border-focus");
        }
        e.style.border = borderVal;
    });
    cashReturn.forEach(e => {
        e.innerHTML = rs;
    });
}