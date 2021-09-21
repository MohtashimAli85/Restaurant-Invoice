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
    menuSelection(menuTwo, "#menu2");
    menuSelection(menuThree, "#menu3");
    menuSelection(menuFour, "#menu4");
    selectedMenu(menuOne, "#menu1")
});

menuTwo.addEventListener("click", () => {
    menuSelection(menuOne, "#menu1");
    menuSelection(menuThree, "#menu3");
    menuSelection(menuFour, "#menu4");
    selectedMenu(menuTwo, "#menu2")
});
menuThree.addEventListener("click", () => {
    menuSelection(menuOne, "#menu1");
    menuSelection(menuTwo, "#menu2");
    menuSelection(menuFour, "#menu4");
    selectedMenu(menuThree, "#menu3")
});

menuFour.addEventListener("click", () => {
    menuSelection(menuOne, "#menu1");
    menuSelection(menuThree, "#menu3");
    menuSelection(menuTwo, "#menu2");
    selectedMenu(menuFour, "#menu4")
});
orderNowBtn.addEventListener("click", () => {
    if (items.innerHTML != "0") {
        if (menuOne.classList.contains("active")) {
            activeChecker(menuOne, "#menu1")
        } else if (menuTwo.classList.contains("active")) {
            activeChecker(menuTwo, "#menu2");
        } else if (menuThree.classList.contains("active")) {
            activeChecker(menuThree, "#menu3")
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