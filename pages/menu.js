import { tables } from "./tables.js";
import { muttonMenu } from "./mutton.js";
import { chickenMenu } from "./chicken.js";
import { sideOrderMenu } from "./sideOrder.js";

const menuOne = document.querySelector(".menu1");
const menuTwo = document.querySelector(".menu2");
const menuThree = document.querySelector(".menu3");
const menuFour = document.querySelector(".menu4");
const mutton = document.getElementById("mutton");
const chicken = document.getElementById("chicken");
const drinks = document.getElementById("drinks");
const sideOrder = document.getElementById("sides");

let item = "";
let orderNowBtn = document.querySelector(".orderNow");
let items = document.querySelector(".items");
muttonMenu.forEach((e) => {
    item += `<div class="item d-flex">
      <img src="../assets/rack-of-lamb.png" alt="mutton img">
      <div>
      <h6>${e.name} (${e.type})</h6>
      <p>Rs.${e.price}</p>
      </div>
      <img src="../assets/add-icon.svg" alt="add icon" class="addIcon addBtn">
  </div>`;
});

mutton.innerHTML = item;
item = "";
chickenMenu.forEach((e) => {
    item += `<div class="item d-flex">
     <img src="../assets/chicken-leg.png" alt="img">
     <div>
     <h6>${e.name} (${e.type})</h6>
     <p>Rs.${e.price}</p>
     </div>
     <img src="../assets/add-icon.svg" alt="add icon" class="addIcon addBtn">
  </div>`;
});
chicken.innerHTML = item;
item = "";

sideOrderMenu.forEach((e) => {
    item += `<div class="item d-flex">
     <img src="../assets/menu.png" alt="img">
     <div>
     <h6>${e.name} (${e.type})</h6>
     <p>Rs.${e.price}</p>
     </div>
     <img src="../assets/add-icon.svg" alt="add icon" class="addIcon addBtn">
  </div>`;
});
sideOrder.innerHTML = item;
item = "";

menuOne.addEventListener("click", () => {
    menuFn(
        menuTwo,
        "#menu2",
        menuThree,
        "#menu3",
        menuFour,
        "#menu4",
        menuOne,
        "#menu1"
    );
});
function menuFn(menu1, id1, menu2, id2, menu3, id3, menu4, id4) {
    menuSelection(menu1, id1);
    menuSelection(menu2, id2);
    menuSelection(menu3, id3);
    selectedMenu(menu4, id4);
}
menuTwo.addEventListener("click", () => {
    menuFn(
        menuOne,
        "#menu1",
        menuThree,
        "#menu3",
        menuFour,
        "#menu4",
        menuTwo,
        "#menu2"
    );
});
menuThree.addEventListener("click", () => {
    menuFn(
        menuOne,
        "#menu1",
        menuTwo,
        "#menu2",
        menuFour,
        "#menu4",
        menuThree,
        "#menu3"
    );
});

menuFour.addEventListener("click", () => {
    menuFn(
        menuOne,
        "#menu1",
        menuTwo,
        "#menu2",
        menuThree,
        "#menu3",
        menuFour,
        "#menu4"
    );
});
orderNowBtn.addEventListener("click", () => {
    if (items.innerHTML != "0") {
        if (menuOne.classList.contains("active")) {
            activeChecker(menuOne, "#menu1");
        } else if (menuTwo.classList.contains("active")) {
            activeChecker(menuTwo, "#menu2");
        } else if (menuThree.classList.contains("active")) {
            activeChecker(menuThree, "#menu3");
        } else if (menuFour.classList.contains("active")) {
            activeChecker(menuFour, "#menu4");
        }
    }
});

function menuSelection(menu, id) {
    if (menu.classList.contains("active")) {
        document.querySelector(`${id}`).style.display = "none";
        menu.classList.remove("active");
    }
}

function selectedMenu(menu, id) {
    document.querySelector(id).style.display = "block";
    document.querySelector(id).classList.add("menuAnimation");
    menu.classList.add("active");
}

function activeChecker(menu, id) {
    document.querySelector(id).style.display = "none";
    menu.classList.remove("active");
}
