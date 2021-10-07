import { footer, orderNowBtnArr, orderNowBtn, takeAway } from "../Component/reset.js";
import { updatePrice, display, getOrderItem, pdCal, delButtons, qtyListener } from "../functions/function.js";
import { addBtn } from "./menu.js";
// import { setTableClick } from "../../../script/index.js"
export let bill = document.querySelector(".bill");
export let totals = document.querySelectorAll(".total");

const orderContainer = document.querySelector(".orderContainer");
let delBtns = document.querySelectorAll(".delImg"),
  cancelBtn = document.querySelector(".cancel"),
  orderItem = document.querySelectorAll(".orderItem"),
  items = document.querySelector(".items"),
  main = document.querySelector("main"),
  body = document.querySelector("body"),
  menuGrid = "",
  orderArray = localStorage.getItem('takeAway')
    ? JSON.parse(localStorage.getItem('takeAway'))
    : [],
  item = "", name = "", price = "", qty = "", newItem = "", tBill = 0;
let tableOrder = localStorage.getItem('tableOrder') ?
  JSON.parse(localStorage.getItem('tableOrder')) : [],
  tableClick = sessionStorage.getItem("tableClick") ?
    JSON.parse(sessionStorage.getItem("tableClick")) : "";
let tableOrderItem = [];
if (tableOrder) {
  tableOrder.forEach(e => {
    tableOrderItem.push(e.name);
  });
}
if (tableClick.tableClicked) {
  item = "";
  tableOrder = localStorage.getItem('tableOrder') ?
    JSON.parse(localStorage.getItem('tableOrder')) : [];
  let tableOrderItem = [];
  if (tableOrder) {
    tableOrder.forEach(e => {
      e.description.forEach(e => {
        tableOrderItem.push(e);
      });
    });
  }
  tableOrderItem.forEach(e => {
    item += `<div class="orderItem orderItemAnimation">
        <div class="orderName d-flex">
            <h5>${e.itemName}</h5>
            <img src="../assets/deleteIcon.svg" alt="delete icon" class="delImg">
        </div>
        <div class="orderPrice d-flex">
            <div class="count d-flex">
                <p class="qty new">${e.qty}</p>
            </div>
            <div class="calculation d-flex">
                <p class="price">${e.price}</p>
                <p class="total">${e.total}</p>
            </div>
        </div>
    </div>`;
  });

  orderContainer.innerHTML = item;
  display(footer, "40%", "flexBasis", "block");
  main.style.flexBasis = "60%";
  qty = document.querySelector(".qty");
  newItem = document.querySelector(".new");
  delBtns = document.querySelectorAll(".delImg");
  totals = document.querySelectorAll(".total");
  orderItem = document.querySelectorAll(".orderItem");
  let pastEdit = document.querySelector(".edit");
  if (newItem) {
    newItem.classList.add("edit");
    newItem.classList.remove("new");
    if (pastEdit != null) {
      pastEdit.classList.remove("edit");
    }
  }

  item = "";
  delButtons(delBtns, totals, qty, items, tBill, bill, footer, main);

  qty = document.querySelectorAll(".qty");
  qtyListener(qty, pastEdit);

  items.innerHTML = qty.length;
  tBill = 0;
  totals.forEach((e) => {
    tBill += Number(e.innerHTML);
  });
  bill.innerHTML = tBill;
}
if (document.querySelector(".menu1")) {
  document.querySelector(".menu1").click();
}
addBtn.forEach((e) => {
  e.addEventListener("click", (e) => {
    display(footer, "40%", "flexBasis", "block");
    main.style.flexBasis = "60%";
    item = e.target.previousElementSibling;
    name = item.children[1].children[0].innerHTML;
    price = item.children[1].children[1].innerHTML;
    price = price.split(".");
    price[1] = pdCal(name, price[1]);
    orderItem = document.querySelectorAll(".orderItem");
    let match = false;
    if (orderItem.length > 0) {
      orderItem.forEach(e => {
        if (name == e.children[0].children[0].innerHTML) {
          let qty = e.children[1].children[0].children[0];
          qty.innerHTML = (1 + Number(qty.innerHTML));
          match = true;
          updatePrice(qty);
        }
      });
    }
    if (!match) {
      item = `<div class="orderItem orderItemAnimation">
        <div class="orderName d-flex">
            <h5>${name}</h5>
            <img src="../assets/deleteIcon.svg" alt="delete icon" class="delImg">
        </div>
        <div class="orderPrice d-flex">
            <div class="count d-flex">
                <p class="qty new">1</p>
            </div>
            <div class="calculation d-flex">
                <p class="price">x ${price[1]}</p>
                <p class="total">${price[1]}</p>
            </div>
        </div>
    </div>`;
      orderContainer.innerHTML += item;
      match = false;
    }
    setTimeout(() => {
      document.querySelectorAll(".orderItem").forEach((e) => {
        e.classList.remove("orderItemAnimation");
      });
    }, 100);
    qty = document.querySelector(".qty");
    newItem = document.querySelector(".new");
    delBtns = document.querySelectorAll(".delImg");
    totals = document.querySelectorAll(".total");
    orderItem = document.querySelectorAll(".orderItem");
    let pastEdit = document.querySelector(".edit");
    if (newItem) {
      newItem.classList.add("edit");
      newItem.classList.remove("new");
      if (pastEdit != null) {
        pastEdit.classList.remove("edit");
      }
    }
    item = "";
    delButtons(delBtns, totals, qty, items, tBill, bill, footer, main);
    qty = document.querySelectorAll(".qty");
    qtyListener(qty, pastEdit);
    items.innerHTML = qty.length;
    tBill = 0;
    totals.forEach((e) => {
      tBill += Number(e.innerHTML);
    });
    bill.innerHTML = tBill;
  });

});

cancelBtn.addEventListener("click", () => {
  orderContainer.innerHTML = "";
  items.innerHTML = 0;
  bill.innerHTML = 0;
  display(footer, "0%", "flexBasis", "none");
  main.style.flexBasis = "100%";
  menuGrid = document.querySelector(".menuGrid");
  menuGrid.classList.remove("col-3");

});

orderNowBtn.addEventListener("click", () => {
  if (items.innerHTML != "0") {
    orderNowBtnArr.forEach(e => {
      display(e.vname, e.value, e.command, e.class);
    })
    body.classList.add("animation");
    orderContainer.style.height = "66vh";
    if (takeAway.classList.contains("active")) {
      orderItem = document.querySelectorAll(".orderItem");
      getOrderItem(orderItem, "takeAway");
      orderArray.push({
        description: name,
        amount: Number(bill.innerHTML),
      });
      localStorage.setItem("takeAway", JSON.stringify(orderArray));
    }
  }
});
let array = [];
let itemNames = "";
let itemPrice = "";
let itemqty = "";
let amount = "";
let totalAmount = "";