import { totals, bill } from "../Menu/order.js";
export function updatePrice(qty) {
    let price = qty.parentElement.nextElementSibling.children[0].innerHTML;
    price = price.split("x");
    price = Number(price[1]);
    let tPrice = qty.parentElement.nextElementSibling.children[1];
    tPrice.innerHTML = price * Number(qty.innerHTML);
    let tBill = 0;
    totals.forEach((e) => {
        tBill += Number(e.innerHTML);
    });
    bill.innerHTML = tBill;
}

export function categoriesSelection(category, order) {
    if (category.classList.contains("active")) {
        category.classList.remove("active");
        order.style.display = "none";
    }
}
export function takeAwayfn(takeAway) {
    if (takeAway.classList.contains("active")) {
        takeAway.classList.remove("active");
    }
}
export function qtyEdit(e, x) {
    if (e.classList.contains("once")) {
        if (e.innerHTML == "0") {
            e.innerHTML = "";
        }
        e.innerHTML += x;
    }
    if (!e.classList.contains("once")) {
        e.classList.add("once");
        e.innerHTML = x;
    }
}
export function display(variableName, value, command, cName) {
    if (value != null) {
        if (command == "flexBasis") {
            variableName.style.flexBasis = value;
        } else {
            variableName.style.display = value;
        }
        if (cName == "block" || cName == "none") {
            variableName.style.display = cName;
        }
    }
    if (command == "add") {
        variableName.classList.add(cName);
    }
    if (command == "remove") {
        variableName.classList.remove(cName);
    }
}


export function activeChecker(menu, id) {
    document.querySelector(id).style.display = "none";
    menu.classList.remove("active");

}
export function validateActive(m1, m2, m3, m4) {
    let arr = [
        {
            Vname: m1,
            id: "#menu1"
        },
        {
            Vname: m2,
            id: "#menu2"
        },
        {
            Vname: m3,
            id: "#menu3"
        },
        {
            Vname: m4,
            id: "#menu4"
        }];
    arr.forEach(e => {
        if (e.Vname.classList.contains("active")) {
            activeChecker(e.Vname, e.id);
        }
    })

}

function dataProvider(name, type, price, img, imgName) {
    return (`<div class="item d-flex">
    <div class="d-flex v-center">
        <img src="../../assets/${img}.png" alt="${imgName} img">
        <div>
        <h6>${name} <span>(${type})</span></h6>
        <p>Rs.${price}</p>
        </div>
    </div>
      <img src="../../assets/add-icon.svg" alt="add icon" class="addIcon addBtn">
  </div>`)
};

export function fillingData(Vname, item, img, imgName, menu) {
    Vname.forEach(e => {
        item += dataProvider(e.name, e.type, e.price, img, imgName);
    });
    menu.innerHTML = item;
    item = "";
}
export function fillData() {

}
export function getOrderItem(item, command, tn) {
    let name = "";
    if (command == "takeAway") {
        item.forEach((e) => {
            name += `${e.children[0].children[0].innerHTML} ${e.children[1].children[0].children[0].innerHTML}, `;
        });
    }
    if (command == "reserved") {
        name = [];
        item.forEach(e => {
            name.push({
                itemName: e.children[0].children[0].innerHTML,
                qty: e.children[1].children[0].children[0].innerHTML,
                price: e.children[1].children[1].children[0].innerHTML,
                total: e.children[1].children[1].children[1].innerHTML
            });
        });
    }
    if (command == "reservedT") {
        name = [];
        item.forEach(e => {
            name.push({
                itemName: e.children[0].children[0].innerHTML,
                qty: e.children[1].children[0].children[0].innerHTML,
                price: e.children[1].children[1].children[0].innerHTML,
                total: e.children[1].children[1].children[1].innerHTML,
                tableNo: tn

            });
        });

    }

    return name;
}

export function pdCal(arg, result) {
    if (arg.includes("PD")) {
        result = Math.round(Number(result) / 12);
    }
    return result;
}

export function delButtons(delBtns, totals, qty, items, tBill, bill, footer, main) {
    delBtns.forEach((e) => {
        e.addEventListener("click", (e) => {
            e.target.parentNode.parentNode.classList.add("orderItemAnimationR");
            setTimeout(() => {
                e.target.parentNode.parentNode.remove();
                totals = document.querySelectorAll(".total");
                qty = document.querySelectorAll(".qty");
                let count = 0;
                qty.forEach((e) => {
                    count += Number(e.innerHTML);
                });
                items.innerHTML = count;
                tBill = 0;
                totals.forEach((e) => {
                    tBill += Number(e.innerHTML);
                });
                bill.innerHTML = tBill;
                if (tBill == 0) {
                    display(footer, "0%", "flexBasis", "none");
                    main.style.flexBasis = "100%";
                }
            }, 500);
        });
    });
}
export function qtyListener(qty, pastEdit) {
    qty.forEach((e) => {
        e.addEventListener("click", () => {
            pastEdit = document.querySelector(".edit");
            if (pastEdit != null) pastEdit.classList.remove("edit");
            e.classList.add("edit");
        });
    });
}
export function fillPrintData(itemArr, invoicep, invoicepTfoot, command) {
    let item = "", totalAmount = 0;
    itemArr.forEach(e => {
        let price = e.price;
        price = price.substr(2);
        item += `<tr>
                        <td width ="70%">${e.itemName}</td>
                        <td width ="10%">${e.qty}</td>
                        <td width ="10%">${price}</td>
                        <td width ="10%">${e.total}</td>
                    </tr>`;
        totalAmount += Number(e.total);
    });
    invoicep.innerHTML = item;
    item = ""
    let serviceTax = Math.round(totalAmount * 0.03);
    item += `<tr>
        <td width="80%">Bill Total</td>

        <td width="10%">${totalAmount}</td>
    </tr>`;
    totalAmount += serviceTax;
    let serviceTaxHtml = `<tr>
                        <td width="80%">S. Charges</td>

                        <td>${serviceTax}</td>
                </tr>`;
    if (command == "takeAway") {
        serviceTaxHtml = "";
        item = ""
    }
    item += `
              ${serviceTaxHtml}
                <tr>
                        <td width ="80%">Final Bill</td>
                        <td  class="tkta">${totalAmount}</td>
                </tr>`;

    invoicepTfoot.innerHTML = item;
}

export function printInfofn(printInfo, orderId) {
    let dt = new Date();
    console.log(orderId);
    console.log(dt.getDate());
    printInfo.innerHTML = `<h4>Order ID: ${orderId}</h4>
                            <div class="d-flex"><h4 style="margin-right:3px;">Date: ${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()}, </h4>
                            <h4> ${dt.getHours()}:${dt.getMinutes()}</h4></div>
                               `;
}
export function startPrint(arr, cmd, orderId) {
    let invoicep = document.querySelector(".invoicep"),
        invoicepTfoot = document.querySelector(".invoicepTfoot"),
        printInfo = document.querySelector(".printInfo");

    fillPrintData(arr, invoicep, invoicepTfoot, cmd);
    // orderId = document.querySelectorAll('.orderID');
    printInfofn(printInfo, orderId);
}

export function getServiceTax(arr) {
    let totalAmount = 0;
    arr.forEach(e => {
        totalAmount += Number(e.total);
    });
    let serviceTax = Math.round(totalAmount * 0.03);
    return serviceTax;
}

export function addToDB(db, dbName, tableNo, cmd) {
    let transaction = db.transaction(dbName, "readwrite");
    let objectStore = transaction.objectStore(dbName);
    let orderItem = document.querySelectorAll(".orderItem");
    let invoiceid = objectStore.count();
    let name = getOrderItem(orderItem, "reserved");
    let table = getOrderItem(orderItem, "reservedT", tableNo);
    invoiceid.onsuccess = function () {
        invoiceid = invoiceid.result;
        console.log(invoiceid);
        if (cmd == "table") {
            let invoiceArr = {
                id: invoiceid + 1,
                table: table
            }
            objectStore.add(invoiceArr);
            startPrint(table, "tableOrder", invoiceid + 1);
        }
        if (cmd == "takeAway") {
            let invoiceArr = {
                id: invoiceid + 1,
                takeAway: name
            }
            objectStore.add(invoiceArr);
            startPrint(name, "takeAway", invoiceid + 1);
            // let nw = require("nw.gui");
            // let win = nw.Window.get();
            // win.print({
            //     'silent': true,
            //     'headerFooterEnabled': false,
            //     'shouldPrintBackgrounds': true,
            //     'autoprint': true,
            //     "marginsType": 1,
            // }
            // );
            window.print();
            window.location.href = "../../index.html";
        }
        if (cmd == "serviceTax") {
            let serviceTax = getServiceTax(name);
            let arr = {
                id: invoiceid + 1,
                service: serviceTax
            }
            objectStore.add(arr);
            window.print();
            // let nw = require("nw.gui");
            // let win = nw.Window.get();
            // win.print({
            //     'silent': true,
            //     'headerFooterEnabled': false,
            //     'shouldPrintBackgrounds': true,
            //     'autoprint': true,
            //     "marginsType": 1,

            // }
            // );
            window.location.href = "../../index.html";

        }

    }
}
export function removeReservedTable(tables, tableNo) {
    let tableOrder = JSON.parse(localStorage.getItem('tableOrder'));
    console.log(tableOrder);
    console.log(tableOrder.length);
    for (let i = 0; i < tableOrder.length; i++) {
        if (tableOrder[i].tableNum == tableNo) {
            tableOrder.splice(i, 1);
            console.log(tableOrder);
        }
    }
    console.log(tableOrder);
    localStorage.setItem("tableOrder", JSON.stringify(tableOrder));
    tables.forEach(e => {
        if (e.tableNo == tableNo) {
            e.reserved = false;
        }
    });
    localStorage.setItem("tables", JSON.stringify(tables));
}