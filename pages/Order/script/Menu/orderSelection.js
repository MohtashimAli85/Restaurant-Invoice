import { tables } from "../Data/tables.js";
import { backBtnArr, assignTables, car, orderNowBtn, reserveTableBtn, tableOrder, carOrder, takeAway } from "../Component/reset.js";
import { categoriesSelection, display, takeAwayfn, getOrderItem } from "../functions/function.js";
import { bill } from "./order.js";
let backBtn = document.querySelector(".backBtn");
let input = document.querySelector(".form__field");
let label = document.querySelector(".form__label"),
    menuIcon = document.querySelector(".restaurantMenu"),
    tableClick = sessionStorage.getItem("tableClick") ?
        JSON.parse(sessionStorage.getItem("tableClick")) : "";
const orderContainer = document.querySelector(".orderContainer");
let allcircles = "", allTables = "", name = "", selectedTables = "", updateTable = "";
let reserveOrderArray = localStorage.getItem('tableOrder')
    ? JSON.parse(localStorage.getItem('tableOrder'))
    : [];

backBtn.addEventListener("click", (e) => {
    menuIcon.style.pointerEvents = "auto";

    backBtnArr.forEach((e) => {
        display(e.vname, e.value, e.command, e.class);
    });
    // document.querySelector(".menu1").click();
    orderContainer.style.height = "55vh";
    setTimeout(() => {
        if (document.querySelector(".menu1")) {
            document.querySelector(".menu1").click();
        }
    }, 1000);
});

assignTables.addEventListener("click", (e) => {
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
                                <img src="../../assets/restaurant-table.png" alt="order">
                                <h5>Table ${e.tableNo}</h5>
                                <img src="../../assets/circle-w.png" alt="circle" class="circle">
                            </div>`;
        }
        else {
            item += `<div class="d-flex table tableSelected ">
                        <img src="../../assets/restaurant-table.png" alt="order">
                        <h5>Table ${e.tableNo}</h5>
                        <img src="../../assets/circle-o.png" alt="circle" class="circle">
                    </div>`;
        }
    });
    tableOrder.innerHTML = item; item = "";
    allcircles = document.querySelectorAll(".circle");
    allTables = document.querySelectorAll(".tableUnselected");
    selectedTables = document.querySelectorAll(".tableSelected");
    if (!tableClick.tableClicked) {
        allcircles.forEach((e) => {
            e.addEventListener("click", (e) => {
                let img = e.target;
                allTables.forEach((t) => {
                    if (t.classList.contains("new")) {
                        t.children[2].src = "../../assets/circle-w.png";
                        t.classList.remove("new");
                    }
                });
                img.src = "../../assets/circle-o.png";
                img.parentNode.classList.add("new");
            });
        });
    }
    if (tableClick.tableClicked) {
        reserveTableBtn.innerHTML = "Update";
        updateTable = tableClick.tableNo;
        selectedTables.forEach(t => {
            let tableNum = t.children[1].innerHTML;
            tableNum = Number(tableNum.substr(-2));
            if (updateTable == tableNum) {
                t.classList.add("update");
            }
        });
    }
});
car.addEventListener("click", () => {
    categoriesSelection(assignTables, tableOrder);
    takeAwayfn(takeAway);
    car.classList.add("active");
    display(carOrder, "block", "add", "animation");
    label.innerHTML = "Car Number";
});
takeAway.addEventListener("click", () => {
    categoriesSelection(car, carOrder);
    categoriesSelection(assignTables, tableOrder);
    takeAway.classList.add("active");
    reserveTableBtn.style.display = "none";
    orderNowBtn.style.display = "block";
});
reserveTableBtn.addEventListener("click", () => {
    let isTableSelected = false;
    allTables.forEach((t) => {
        if (t.classList.contains("new")) {
            let orderItem = document.querySelectorAll(".orderItem");
            let i = t.children[1].innerHTML;
            i = Number(i.substr(-2));
            tables[i - 1].reserved = true;
            name = getOrderItem(orderItem, "reserved");
            reserveOrderArray.push({
                description: name,
                total: Number(bill.innerHTML),
                tableNum: i
            });
            localStorage.setItem("tableOrder", JSON.stringify(reserveOrderArray));
            localStorage.setItem("tables", JSON.stringify(tables));
            isTableSelected = true;
            window.location.href = "../../../index.html";
        }
    });
    if (tableClick != "") {
        let orderItem = document.querySelectorAll(".orderItem");
        name = getOrderItem(orderItem, "reserved");
        reserveOrderArray.forEach(e => {
            console.log(e.tableNum);
            if (e.tableNum == updateTable) {
                e.description = name;
                e.total = Number(bill.innerHTML);
            }
        });
        localStorage.setItem("tableOrder", JSON.stringify(reserveOrderArray));
        localStorage.setItem("tables", JSON.stringify(tables));
        window.location.href = "../../../index.html";
    } else if (!isTableSelected) {
        alert("Kindly select table to reserve order.")
    }
});

export { allTables };