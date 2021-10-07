import { tables } from "../pages/script/Data/tables.js";
let orderArray = localStorage.getItem('takeAway')
    ? JSON.parse(localStorage.getItem('takeAway'))
    : [];
sessionStorage.setItem("tableClick", "");

let orders = document.querySelector("#orders"),
    reservedList = document.querySelector(".reservedList"),
    reservedTable = document.querySelectorAll(".reservedTable");
let rows = "", item = "", tableClick = false;
let orderId = 1;
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
    console.log(rows);
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
        tableClick = {
            tableClicked: true,
            tableNo: e.innerHTML
        }
        console.log(tableClick);
        window.location.href = "pages/order.html";
        sessionStorage.setItem("tableClick", JSON.stringify(tableClick));
    });
});
