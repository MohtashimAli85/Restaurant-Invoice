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
    modalw = document.querySelector(".modal-wrap"),
    updateBtn = document.querySelector(".updateBtn"),
    invoiceBtn = document.querySelector(".invoiceBtn"),
    closeBtn = document.querySelector(".closeBtn"),
    backBtn = document.querySelector(".backBtn"),
    invoice = document.querySelector(".invoice"),
    billInvoice = document.querySelector(".billInvoice"),
    totalInvoice = document.querySelector(".totalInvoice"),
    salesTable = document.querySelector(".main");
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
}
let amount = document.querySelectorAll('.amount');
let total = document.querySelector('.total');
let totalAmount = 0;
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
        modalw.classList.add("pressedBtn");
        console.log(tableClick);
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
    // console.log(tableClick);
    window.location.href = "pages/order.html";
});
invoiceBtn.addEventListener("click", () => {
    sessionStorage.setItem("tableClick", "");
    let tableOrderItem = [], serviceTax = 0;
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
        totalAmount = 0;
        tableOrderItem.forEach(e => {
            let price = e.price;
            price = price.substr(2);
            item += `<tr>
                        <td>${e.itemName}</td>
                        <td>${e.qty}</td>
                        <td>${price}</td>
                        <td>${e.total}</td>
                    </tr>`;
            totalAmount += Number(e.total);
        });
        serviceTax = Math.round(totalAmount * 0.03);
        item += `<tr>
                        <td colspan="3">Service Tax</td>
                        
                        <td>${serviceTax}</td>
                </tr>`;
        item += `<tr>
                    <td colspan="3">Received Cash</td>
                    <td class="cashrcvd"></td>
                </tr>`;
        totalAmount += serviceTax;
        invoice.innerHTML = item;
        totalInvoice.innerHTML = totalAmount;
        modal.style.display = "none";
    }
});
backBtn.addEventListener("click", () => {
    billInvoice.style.display = "none";
    salesTable.style.display = "block";

})