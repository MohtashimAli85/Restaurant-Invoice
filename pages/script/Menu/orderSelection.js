import { tables } from "../Data/tables.js";
import { backBtnArr, assignTables, car, orderNowBtn, reserveTableBtn, tableOrder, carOrder, takeAway } from "../Component/reset.js";
import { categoriesSelection, display, takeAwayfn, getOrderItem } from "../functions/function.js";
import { bill } from "./order.js";
let backBtn = document.querySelector(".backBtn");
let input = document.querySelector(".form__field");
let label = document.querySelector(".form__label"),
    tableClick = sessionStorage.getItem("tableClick") ?
        JSON.parse(sessionStorage.getItem("tableClick")) : "";
const orderContainer = document.querySelector(".orderContainer");
let allcircles = "", allTables = "", name = "", newTables = "", updateTable = "";
let reserveOrderArray = localStorage.getItem('tableOrder')
    ? JSON.parse(localStorage.getItem('tableOrder'))
    : [];
backBtn.addEventListener("click", (e) => {
    backBtnArr.forEach((e) => {
        display(e.vname, e.value, e.command, e.class);
    });
    document.querySelector(".menu1").click();
    orderContainer.style.height = "55vh";
});

assignTables.addEventListener("click", (e) => {
    // if (tableClick != "") {
    //     updateTable = tableClick.tableNo;
    //     updateTable = Number(updateTable.slice(-1));
    //     console.log("🚀 ~ file: orderSelection.js ~ line 26 ~ assignTables.addEventListener ~ updateTable", updateTable);
    //     tables[updateTable - 1].reserved = false;
    // }
    categoriesSelection(car, carOrder);
    takeAwayfn(takeAway);
    assignTables.classList.add("active");
    display(tableOrder, "grid", "add", "animation");
    display(reserveTableBtn, "block", "add", "reserveActive");
    orderNowBtn.style.display = "none";
    let item = "";
    tables.forEach((e) => {
        if (!e.reserved) {
            item += `<div class="d-flex table tableUnselected">
                                <img src="../assets/order.svg" alt="order">
                                <h5>Table ${e.tableNo}</h5>
                                <img src="../assets/circle-w.png" alt="circle" class="circle">
                            </div>`;
        }
        else {
            item += `<div class="d-flex table tableSelected ">
                        <img src="../assets/order.svg" alt="order">
                        <h5>Table ${e.tableNo}</h5>
                        <img src="../assets/circle-o.png" alt="circle" class="circle">
                    </div>`;
        }
    });
    tableOrder.innerHTML = item;
    item = "";
    allcircles = document.querySelectorAll(".circle");
    allTables = document.querySelectorAll(".tableUnselected");
    allcircles.forEach((e) => {
        e.addEventListener("click", (e) => {
            let img = e.target;
            allTables.forEach((t) => {
                if (t.classList.contains("new")) {
                    t.children[2].src = "../assets/circle-w.png";
                    t.classList.remove("new");

                } else {
                    img.src = "../assets/circle-o.png";
                    img.parentNode.classList.add("new");
                }
            });
            console.log(allTables);
        });
    });
});

car.addEventListener("click", (e) => {
    categoriesSelection(assignTables, tableOrder);
    takeAwayfn(takeAway);
    car.classList.add("active");
    display(carOrder, "block", "add", "animation");
    label.innerHTML = "Car Number";
});

takeAway.addEventListener("click", (e) => {
    categoriesSelection(car, carOrder);
    categoriesSelection(assignTables, tableOrder);
    takeAway.classList.add("active");
    reserveTableBtn.style.display = "none";
    orderNowBtn.style.display = "block";
});
reserveTableBtn.addEventListener("click", (e) => {
    // reserveOrderArray.forEach(e => {
    //     if (e.tableNum == updateTable) { }
    // })

    allTables.forEach((t) => {
        if (t.classList.contains("new")) {
            let orderItem = document.querySelectorAll(".orderItem");
            let i = t.children[1].innerHTML;
            i = Number(i.substr(-2));
            console.log(i);
            tables[i - 1].reserved = true;
            name = getOrderItem(orderItem, "reserved");
            // console.log(name);
            reserveOrderArray.push({
                description: name,
                total: Number(bill.innerHTML),
                tableNum: i
            });
            // console.log(reserveOrderArray);
            localStorage.setItem("tableOrder", JSON.stringify(reserveOrderArray));
            localStorage.setItem("tables", JSON.stringify(tables));
            // console.log(localStorage.getItem("tables"));
            console.log(localStorage.getItem("tableOrder"));
            window.location.href = "../../index.html";
        }
    });
    if (tableClick != "") {
        updateTable = tableClick.tableNo;
        // updateTable = Number(updateTable.slice(-1));
        // console.log("🚀 ~ file: orderSelection.js ~ line 26 ~ assignTables.addEventListener ~ updateTable", updateTable);
        let orderItem = document.querySelectorAll(".orderItem");
        // tables[updateTable - 1].reserved = false;
        name = getOrderItem(orderItem, "reserved");
        console.log(reserveOrderArray);
        // console.log("🚀 ~ file: orderSelection.js ~ line 119 ~ allTables.forEach ~ name", name);
        reserveOrderArray.forEach(e => {
            console.log(e.tableNum);
            if (e.tableNum == updateTable) {
                e.description = name;
                e.total = Number(bill.innerHTML);
                console.log("done");
            }
        });
        console.log(reserveOrderArray);
        localStorage.setItem("tableOrder", JSON.stringify(reserveOrderArray));
        localStorage.setItem("tables", JSON.stringify(tables));
        // console.log(localStorage.getItem("tables"));
        console.log(localStorage.getItem("tableOrder"));
        window.location.href = "../../index.html";
    }
});

export { allTables };
// console.log(tables[0].reserved);
// console.log(tables[0].tableNo);
