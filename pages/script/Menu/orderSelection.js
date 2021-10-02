import { tables } from "../Data/tables.js";
import { backBtnArr, assignTables, car, orderNowBtn, reserveTableBtn, tableOrder, carOrder, takeAway } from "../Component/reset.js";
import { categoriesSelection, display } from "../function/function.js";
let backBtn = document.querySelector(".backBtn");
let input = document.querySelector(".form__field");
let label = document.querySelector(".form__label");
let allcircles = "", allTables = "";
backBtn.addEventListener("click", (e) => {
    backBtnArr.forEach((e) => {
        display(e.vname, e.value, e.command, e.class);
    });
    document.querySelector(".menu1").click();
});

assignTables.addEventListener("click", (e) => {
    categoriesSelection(car, carOrder);
    if (takeAway.classList.contains("active")) {
        takeAway.classList.remove("active");
    }
    assignTables.classList.add("active");
    display(tableOrder, "grid", "add", "animation");
    display(reserveTableBtn, "block", "add", "reserveActive");
    orderNowBtn.style.display = "none";
    let item = "";
    tables.forEach((e) => {
        item += `<div class="d-flex table">
    <img src="../assets/order.svg" alt="order">
    <h5>Table ${e.tableNo}</h5>
    <img src="../assets/circle-w.png" alt="circle" class="circle">
  </div>`;
    });
    tableOrder.innerHTML = item;
    item = "";
    allcircles = document.querySelectorAll(".circle");
    allTables = document.querySelectorAll(".table");
    allcircles.forEach((e) => {
        e.addEventListener("click", (e) => {
            let img = e.target;
            allTables.forEach((t) => {
                if (t.classList.contains("checked")) {
                    t.children[2].src = "../assets/circle-w.png";
                    t.classList.remove("checked");
                } else {
                    img.src = "../assets/circle-o.png";
                    img.parentNode.classList.add("checked");
                    img.parentNode.classList.add("new");
                }
            });
        });
    });
});

car.addEventListener("click", (e) => {
    categoriesSelection(assignTables, tableOrder);
    if (takeAway.classList.contains("active")) {
        takeAway.classList.remove("active");
    }
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
    allTables.forEach((t) => {
        if (t.classList.contains("new")) {
        }
    });
});