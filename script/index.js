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
    takeAwayPrint.forEach(e => {
        let price = e.price;
        // console.log(e.price);
        price = price.substr(2);
        item += `<tr>
                        <td>${e.itemName}</td>
                        <td>${e.qty}</td>
                        <td>${price}</td>
                        <td>${e.total}</td>
                    </tr>`;
        totalAmount += Number(e.total);
    })
    invoice.innerHTML = item;
    invoicep.innerHTML = item;
    item = "";
    // serviceTax = Math.round(totalAmount * 0.03);
    totalAmount += serviceTax;
    item += `<colgroup>
                <col width="60%" />
                <col width="10%" />
                <col width="15%" />
                <col width="15%" />
              </colgroup>
                <tr class="border-focus">
                    <td colspan="3">Received Cash</td>
                    <td class="cashrcvd"></td>
                </tr>
                <tr>
                        <td colspan="3">Total</td>

                        <td class="tkta">${totalAmount}</td>
                </tr>
                <tr>
                        <td colspan="3">Return</td>

                        <td class="cashReturn"></td>
                </tr>`;

    invoiceTfoot.innerHTML = item;
    invoicepTfoot.innerHTML = item;
    // item = invoice.innerHTML;
    // totalInvoicep.innerHTML = totalAmount;
    // modal.style.display = "none";
    printBtns.classList.add("d-flexi");
    cashrcvd = document.querySelector(".cashrcvd");
    cashReturn = document.querySelector(".cashReturn");
    cashrcvd.contentEditable = true;
    // localStorage.setItem("takeAwayPrint", "");
    billInvoice.style.display = "block";
    salesTable.style.display = "none";
    item = "";
    // window.print();

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
        invoice.innerHTML = item;
        invoicep.innerHTML = item;
        item = ""
        serviceTax = Math.round(totalAmount * 0.03);
        totalAmount += serviceTax;
        item += `<colgroup>
                <col width="60%" />
                <col width="10%" />
                <col width="15%" />
                <col width="15%" />
              </colgroup>
              <tr>
                        <td colspan="3">Service Tax</td>

                        <td>${serviceTax}</td>
                </tr>
                <tr class="border-focus">
                    <td colspan="3">Received Cash</td>
                    <td class="cashrcvd"></td>
                </tr>
                <tr>
                        <td colspan="3">Total</td>

                        <td>${totalAmount}</td>
                </tr>
                <tr>
                        <td colspan="3">Return</td>

                        <td class="cashReturn"></td>
                </tr>`;

        invoiceTfoot.innerHTML = item;
        invoicepTfoot.innerHTML = item;
        // item = invoice.innerHTML;
        // totalInvoicep.innerHTML = totalAmount;
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

});
enterBtn.addEventListener("click", () => {
    let cashRcvd = Number(cashrcvd.innerHTML);
    console.log(cashRcvd);
    let totalAmount = Number(document.querySelector(".tkta").innerHTML);
    console.log(totalAmount);

    if (cashRcvd) {
        if (cashRcvd < totalAmount) {
            alert("Kindly Enter Valid Received Cash");
            cashrcvd.innerHTML = "";
        } else {
            cashrcvd.parentNode.classList.remove("border-focus");
            cashrcvd.style.border = "none";
            let rs = cashRcvd - totalAmount;
            cashReturn.innerHTML = rs;
            cashrcvd = document.querySelectorAll(".cashrcvd");
            cashReturn = document.querySelectorAll(".cashReturn");
            cashrcvd.forEach(e => {
                e.innerHTML = cashRcvd
            });
            cashReturn.forEach(e => {
                e.innerHTML = rs;
            });
        }
    } else {
        alert("Enter Received Cash");
    }
});
printBtn.addEventListener("click", () => {
    window.print();
})