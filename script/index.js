import { tables } from "../pages/script/Data/tables.js";
let orderArray = localStorage.getItem('takeAway')
    ? JSON.parse(localStorage.getItem('takeAway'))
    : [],
    tableOrder = localStorage.getItem('tableOrder') ?
        JSON.parse(localStorage.getItem('tableOrder')) : [];
sessionStorage.setItem("tableClick", "");

let orders = document.querySelector("#orders"),
    reservedList = document.querySelector(".reservedList"),
    reservedTable = document.querySelectorAll(".reservedTable"),
    modal = document.querySelector(".modal"),
    updateBtn = document.querySelector(".updateBtn"),
    printBtn = document.querySelector(".printBtn"),
    closeBtn = document.querySelector(".closeBtn"),
    invoice = document.querySelector(".invoice"),
    billInvoice = document.querySelector(".billInvoice"),
    totalInvoice = document.querySelector(".totalInvoice");
let rows = "", item = "", tableClick = false;
let orderId = 1;
console.log("🚀 ~ file: index.js ~ line 3 ~ orderArray", orderArray);

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
    // console.log(orderArray);
} else {
    // console.log(orderArray + " else");

}
let amount = document.querySelectorAll('.amount');
let total = document.querySelector('.total');
let totalAmount = 0;
amount.forEach(e => {
    totalAmount += Number(e.innerHTML);
});
// console.log
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
console.log("🚀 ~ file: index.js ~ line 49 ~ reservedTable", reservedTable);

reservedTable.forEach(e => {
    e.addEventListener("click", () => {
        let tableNum = e.innerHTML;
        tableNum = Number(tableNum.substr(-2));
        tableClick = {
            tableClicked: true,
            tableNo: tableNum
        }
        modal.style.display = 'flex';
        console.log(tableClick);
        sessionStorage.setItem("tableClick", JSON.stringify(tableClick));

        // window.location.href = "pages/order.html";
        // sessionStorage.setItem("tableClick", JSON.stringify(tableClick));
    });
});

closeBtn.addEventListener("click", () => {
    tableClick = "";
    sessionStorage.setItem("tableClick", "");
    modal.style.display = "none";
});

updateBtn.addEventListener("click", () => {
    // console.log(tableClick);
    window.location.href = "pages/order.html";
});
printBtn.addEventListener("click", () => {
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
        totalAmount = 0;
        tableOrderItem.forEach(e => {
            let price = e.price;
            price = price.substr(2);
            item += `<tr>
                        <td>${e.itemName}</td>
                        <td>${e.qty}</td>
                        <td>${price}</td>
                        <td>${e.total}</td>
                    </tr>`
            totalAmount += Number(e.total);
        });
        invoice.innerHTML = item;
        totalInvoice.innerHTML = totalAmount;
    }




})
