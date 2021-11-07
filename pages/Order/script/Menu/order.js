
import { footer, orderNowBtnArr, orderNowBtn, takeAway, car, assignTables } from "../Component/reset.js";
import { updatePrice, display, getOrderItem, pdCal, delButtons, qtyListener } from "../functions/function.js";
// import { addBtn } from "./menu.js";
import { orderItemComponent } from "../Component/orderItem.js";
// import { setTableClick } from "../../../script/index.js"
export let bill = document.querySelector(".bill");
export let totals = document.querySelectorAll(".total");
const orderContainer = document.querySelector(".orderContainer");
let delBtns = document.querySelectorAll(".delImg"),
  cancelBtn = document.querySelector(".cancel"),
  orderItem = document.querySelectorAll(".orderItem"),
  items = document.querySelector(".items"),
  main = document.querySelector("main"),
  header = document.querySelector("header"),
  body = document.querySelector("body"),
  menuIcon = document.querySelector(".restaurantMenu"),
  menuGrid = "",
  orderArray = localStorage.getItem('takeAway')
    ? JSON.parse(localStorage.getItem('takeAway'))
    : [],
  item = "", name = "", price = "", qty = "", newItem = "", tBill = 0, takeAwayOrder = [];
let tableOrder = localStorage.getItem('tableOrder') ?
  JSON.parse(localStorage.getItem('tableOrder')) : [],
  tableClick = sessionStorage.getItem("tableClick") ?
    JSON.parse(sessionStorage.getItem("tableClick")) : "",
  updateClicked = sessionStorage.getItem("updateClick") ?
    JSON.parse(sessionStorage.getItem("updateClick")) : "";
let tableOrderItem = [];

export function executeOrder() {
  let addBtn = document.querySelectorAll(".addBtn");
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
        if (e.tableNum == tableClick.tableNo) {
          e.description.forEach(e => {
            tableOrderItem.push(e);
          });
        }
      });
    }
    tableOrderItem.forEach(e => {
      let price = e.price;
      price = price.split("x");
      price = Number(price[1]);
      item += orderItemComponent(e.itemName, e.qty, price, e.total);
    });

    orderContainer.innerHTML = item;
    setTimeout(() => {
      changeLayout(1, "40%", "block", "0%", "none", "60%");

    }, 500)

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

  addBtn.forEach((e) => {
    e.addEventListener("click", (e) => {
      changeLayout(1, "40%", "block", "0%", "none", "60%");
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
        item = orderItemComponent(name, 1, price[1], price[1]);
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
    changeLayout(0, "0%", "none", "10%", "block", "90%");
    menuGrid = document.querySelector(".menuGrid");
    menuGrid.classList.remove("col-3");
  });

  orderNowBtn.addEventListener("click", () => {
    let isZero = false, isNotZero = false;
    console.log("🚀 ~ file: order.js ~ line 159 ~ orderNowBtn.addEventListener ~ isZero", isZero);
    let isAlert = false;
    qty = document.querySelectorAll(".qty");
    if (qty) {
      qty.forEach(e => {
        let num = Number(e.innerHTML);
        if (num == 0 && !isZero) {
          isZero = true;
        }
      });
    }
    if (items.innerHTML != "0") {
      if (!isZero) {
        orderNowBtnArr.forEach(e => {
          display(e.vname, e.value, e.command, e.class);
        });
        body.classList.add("animation");
        orderContainer.style.height = "66vh";
        isNotZero = true;

      } else {
        isZero = false;
        if (document.querySelector(".menu1")) {
          document.querySelector(".menu1").click();
        }

      }
      if (isNotZero) {
        menuIcon.style.pointerEvents = "none";
        if (tableClick.tableClicked) {
          assignTables.click();
          takeAway.style.pointerEvents = "none";
          car.style.pointerEvents = "none";
        } else {
          car.style.pointerEvents = "auto";
          takeAway.style.pointerEvents = "auto";
        }
        if (takeAway.classList.contains("active")) {
          orderItem = document.querySelectorAll(".orderItem");
          name = getOrderItem(orderItem, "takeAway");
          orderArray.push({
            description: name,
            amount: Number(bill.innerHTML),
          });
          localStorage.setItem("takeAway", JSON.stringify(orderArray));
          name = getOrderItem(orderItem, "reserved");
          localStorage.setItem("takeAwayPrint", JSON.stringify(name));
          window.location.href = "../../index.html";
        }
        if (car.classList.contains("active")) {
        }
      }
    }
  });
  menuIcon.addEventListener("click", () => {
    changeLayout(0, "0%", "none", "10%", "block", "90%");
  });
}
function changeLayout(val1, val2, val3, val4, val5, val6) {
  menuIcon.style.opacity = val1;
  main.style.flexBasis = val6;
  display(footer, val2, "flexBasis", val3);
  display(header, val4, "flexBasis", val5);
}