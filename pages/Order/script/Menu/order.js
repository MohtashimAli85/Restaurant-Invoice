
// import { footer, orderNowBtn } from "../Component/reset.js";
import { updatePrice, display, getOrderItem, pdCal, delButtons, qtyListener, addToDB, removeReservedTable } from "../functions/function.js";
import { orderItemComponent } from "../Component/orderItem.js";
import { tables } from "../Data/tables.js";
import { muttonMenu } from "../Data/mutton.js";
import { chickenMenu } from '../Data/chicken.js';
import { drinksMenu } from '../Data/drinks.js';
import { sideOrderMenu } from '../Data/sideOrder.js';
export let bill = document.querySelector(".bill");
export let totals = document.querySelectorAll(".total");
const orderContainer = document.querySelector(".orderContainer");
let delBtns = document.querySelectorAll(".delImg"),
  cancelBtn = document.querySelector(".cancel"),
  cancelOrderBtn = document.querySelector(".cancelOrder"),
  reserveBtn = document.querySelector(".reserveTable"),
  orderItem = document.querySelectorAll(".orderItem"),
  items = document.querySelector(".items"),
  main = document.querySelector("main"),
  menuIcon = document.querySelector(".restaurantMenu"),
  btns = document.querySelector(".btns"), msg = document.querySelector(".msg"),
  yesBtn = document.querySelector(".yesBtn"), noBtn = document.querySelector(".noBtn"),
  modal = document.querySelector(".modal"), modalw = document.querySelector(".modal-wrap"),
  menuGrid = "",
  footer = document.querySelector("footer"),
  orderNowBtn = document.querySelector(".orderNow"),
  closeBtn = document.querySelector(".closeBtn"),
  tableHtml = document.querySelector(".tableOrder"),
  tableNoP = document.querySelector(".tableNoP"),
  orderArray = localStorage.getItem('takeAway')
    ? JSON.parse(localStorage.getItem('takeAway'))
    : [],
  dineInClicked = sessionStorage.getItem("DineInClicked") ?
    JSON.parse(sessionStorage.getItem("DineInClicked")) : false,
  takeAwayClicked = sessionStorage.getItem("TakeAwayClicked") ?
    JSON.parse(sessionStorage.getItem("TakeAwayClicked")) : false,
  item = "", name = "", price = "", qty = "", newItem = "", tBill = 0, takeAwayOrder = [];
let tableOrder = localStorage.getItem('tableOrder') ?
  JSON.parse(localStorage.getItem('tableOrder')) : [],
  tableClick = sessionStorage.getItem("tableClick") ?
    JSON.parse(sessionStorage.getItem("tableClick")) : "",
  updateClicked = sessionStorage.getItem("updateClick") ?
    JSON.parse(sessionStorage.getItem("updateClick")) : "";
let tableOrderItem = [], allcircles = "", allTables = "";
let reserveOrderArray = localStorage.getItem('tableOrder')
  ? JSON.parse(localStorage.getItem('tableOrder'))
  : [];
changeLayout("0%", "none", "10%", "block", "100%");

if (tableOrder) {
  tableOrder.forEach(e => {
    tableOrderItem.push(e.name);
  });
}
if (takeAwayClicked) {
  orderNowBtn.innerHTML = "Print";
  sessionStorage.setItem("TakeAwayClicked", JSON.stringify(false));
}
if (dineInClicked) {
  reserveBtn.style.display = "block";
  sessionStorage.setItem("DineInClicked", JSON.stringify(false))
}
if (tableClick.tableClicked) {
  reserveBtn.style.display = "block";
  reserveBtn.innerHTML = "Update";
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
  orderContainer.scrollTo(0, orderContainer.scrollHeight);
  setTimeout(() => {
    changeLayout("40%", "block", "0%", "none", "60%");

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
export function executeOrder() {
  let addBtn = document.querySelectorAll(".addBtn");
  addBtn.forEach((e) => {
    e.addEventListener("click", (e) => {
      changeLayout("40%", "block", "0%", "none", "60%");
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
        let p = item.children[1].children[0].children[0];
        if (p.innerHTML == "(PD)" || p.innerHTML == "(L&amp;B/PD)") {
          p.innerHTML = ""
        }
        name = item.children[1].children[0].innerHTML;

        item = orderItemComponent(name, 1, price[1], price[1]);
        orderContainer.innerHTML += item;
        orderContainer.scrollTo(0, orderContainer.scrollHeight);
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
}
cancelBtn.addEventListener("click", () => {
  orderContainer.innerHTML = "";
  items.innerHTML = 0;
  bill.innerHTML = 0;
  changeLayout("0%", "none", "10%", "block", "100%");
  menuGrid = document.querySelector(".menuGrid");
  menuGrid.classList.remove("col-3");
  modalCall("", "none", "none", "grid", "remove", "");

});
cancelOrderBtn.addEventListener("click", () => {
  modalCall("cancelOrder", "block", "flex", "none", "add", "Do want to Cancel Order ?");


});
let db, request = window.indexedDB.open("AminKababHouse", 2), invoiceid = 0;
request.onupgradeneeded = function (e) {

  let db = request.result;
  localStorage.setItem("DataBaseBuilt", JSON.stringify(true));
  console.log(db);
  switch (e.oldVersion) {
    case 0:
      console.log("inside case 0")
      let objectStore = db.createObjectStore("chicken", { keyPath: "id" });
      chickenMenu.forEach(e => {
        objectStore.add(e);
      });
      objectStore = db.createObjectStore("sideOrder", { keyPath: "id" });
      sideOrderMenu.forEach(e => {
        objectStore.add(e);
      });
      objectStore = db.createObjectStore("drinks", { keyPath: "id" });
      drinksMenu.forEach(e => {
        objectStore.add(e);
      });
      objectStore = db.createObjectStore("mutton", { keyPath: "id" });
      muttonMenu.forEach(e => {
        objectStore.add(e);
      });
      objectStore = db.createObjectStore("invoice", { keyPath: "id" });

      objectStore = db.createObjectStore("serviceTax", { keyPath: "id" });
      break;
    case 1:
      console.log("its 1!");
      break;
    case 2:
      console.log("its 2");
      break;
    default:
      location.reload();
  }
}
request.onsuccess = (e) => {
  db = request.result;
  console.log("success", db);
  // location.reload();

}


orderNowBtn.addEventListener("click", () => {
  let isZero = false, isNotZero = true;
  qty = document.querySelectorAll(".qty");
  if (qty) {
    qty.forEach(e => {
      let num = Number(e.innerHTML);
      if (num == 0) {
        isZero = true;
      }
    });
  }
  if (items.innerHTML != "0") {
    if (!isZero) {
      if (takeAwayClicked) {
        modalCall("printTakeAway", "block", "flex", "none", "add", "Do want to Print Order ?");
        /* Put Silent Print Function and redirection in above function*/
      }
      if (tableClick.tableClicked) {
        modalCall("printTableOrder", "block", "flex", "none", "add", "Do want to Print Order ?");
        /* Put Silent Print Function and redirection in above function */
      }

    }
  }
});
yesBtn.addEventListener("click", (e) => {
  if (yesBtn.classList.contains("printTakeAway")) {
    tableNoP.innerHTML = ``;
    addToDB(db, "invoice", "", "takeAway");
    yesBtn.classList.remove("printTakeAway");

  }
  if (yesBtn.classList.contains("printTableOrder")) {
    tableNoP.innerHTML = `Table: ${tableClick.tableNo}`;
    removeReservedTable(tables, tableClick.tableNo);
    changeLayout("0%", "none", "10%", "block", "100%");
    addToDB(db, "invoice", tableClick.tableNo, "table");
    addToDB(db, "serviceTax", "", "serviceTax");
    yesBtn.classList.remove("printTableOrder");

  }
  if (yesBtn.classList.contains("cancelOrder")) {
    removeReservedTable(tables, tableClick.tableNo);
    changeLayout("0%", "none", "10%", "block", "100%");
    yesBtn.classList.remove("cancelOrder");

    window.location.href = "../../../index.html";
  }
});
noBtn.addEventListener("click", function () {
  modalCall("", "none", "none", "grid", "remove");
});
reserveBtn.addEventListener("click", () => {
  let item = "";
  if (tableClick.tableClicked) {
    let orderItem = document.querySelectorAll(".orderItem");
    name = getOrderItem(orderItem, "reserved");
    reserveOrderArray.forEach(e => {
      console.log(e.tableNum);
      if (e.tableNum == tableClick.tableNo) {
        e.description = name;
        e.total = Number(bill.innerHTML);
      }
    });
    localStorage.setItem("tableOrder", JSON.stringify(reserveOrderArray));
    localStorage.setItem("tables", JSON.stringify(tables));
    window.location.href = "../../../index.html";
  } else {
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
    // tableHtml.style.display = "grid";
    // modalw.classList.add("pressedBtn");
    // modal.style.display = "block";
    tableHtml.innerHTML = item; item = "";
    modalCall("", "none", "flex", "grid", "", "")

    allcircles = document.querySelectorAll(".circle");
    allTables = document.querySelectorAll(".tableUnselected");
    allcircles.forEach((e) => {
      e.addEventListener("click", (e) => {
        let img = e.target;
        img.src = "../../assets/circle-o.png";
        img.parentNode.classList.add("new");
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
            window.location.href = "../../../index.html";
          }
        });
      });
    });

  }

});
closeBtn.addEventListener("click", () => {
  modalCall("", "none", "none", "grid", "remove");

  // modalw.classList.remove("pressedBtn");
  // modal.style.display = "none";
});
menuIcon.addEventListener("click", () => {
  window.location.href = "../../index.html";
});

function changeLayout(val2, val3, val4, val5, val6) {
  main.style.flexBasis = val6;
  display(footer, val2, "flexBasis", val3);
}

function modalCall(orderType, display1, display2, display3, cmd, msgg) {
  btns.style.display = display1;
  modal.style.display = display2;
  tableHtml.style.display = display3;
  modalw.classList.add("pressedBtn");

  if (cmd == "add") {
    yesBtn.classList.add(orderType);
    modalw.classList.add("printClicked");
  }
  if (cmd == "remove") {
    modalw.classList.remove("pressedBtn");
    modalw.classList.remove("printClicked");
    if (yesBtn.classList.contains("printTakeAway")) {
      yesBtn.classList.remove("printTakeAway");

    }
    if (yesBtn.classList.contains("printTableOrder")) {
      yesBtn.classList.remove("printTableOrder");
    }
    if (yesBtn.classList.contains("cancelOrder")) {
      yesBtn.classList.remove("cancelOrder");
    }
  }

  msg.innerHTML = msgg;
}
