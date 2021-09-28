import { tables } from "./tables.js";
import { backBtnArr, footer, orderNowBtnArr } from "./reset.js";
import {
  assignTables,
  car,
  orderNowBtn,
  reserveTableBtn,
  tableOrder,
  carOrder,
  takeAway,
  categories,
  orderSelection,
} from "./reset.js";

let delBtns = document.querySelectorAll(".delImg");
let cancelBtn = document.querySelector(".cancel");
let backBtn = document.querySelector(".backBtn");
const orderContainer = document.querySelector(".orderContainer");
let orderItem = document.querySelectorAll(".orderItem");
let items = document.querySelector(".items");
let bill = document.querySelector(".bill");
let totals = document.querySelectorAll(".total");
let input = document.querySelector(".form__field");
let label = document.querySelector(".form__label");
let btns = document.querySelectorAll(".btn");
let main = document.querySelector("main");
let body = document.querySelector("body");
let menuGrid = "";
let order = [];
let item = "",
  allcircles = "",
  allTables = "";

item = "";
let name = "",
  price = "",
  qty = "",
  newItem = "",
  tBill = 0;
const addBtn = document.querySelectorAll(".addBtn");
document.querySelector(".menu1").click();
print();
addBtn.forEach((e) => {

  e.addEventListener("click", (e) => {
    menuGrid = document.querySelector(".menuGrid");
    menuGrid.classList.add("col-3");
    footer.style.display = "block";
    footer.style.flexBasis = "35%";
    main.style.flexBasis = "65%";

    item = e.target.previousElementSibling;
    name = item.children[1].children[0].innerHTML;
    price = item.children[1].children[1].innerHTML;
    price = price.split(".");
    if (name.includes("PD")) {
      // console.log(price);
      price[1] = Math.round(Number(price[1]) / 12);
    }
    orderItem = document.querySelectorAll(".orderItem");
    let match = false;
    if (orderItem.length > 0) {
      console.log();
      orderItem.forEach(e => {
        if (name == e.children[0].children[0].innerHTML) {
          let qty = e.children[1].children[0].children[0];
          qty.innerHTML = (1 + Number(qty.innerHTML));
          match = true;
          // qty = document.querySelectorAll(".qty")
          updatePrice(qty);
        }
      });

    } if (!match) {
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
          // console.log(tBill);
          bill.innerHTML = tBill;
          if (tBill == 0) {
            footer.style.flexBasis = "0%";
            footer.style.display = "none";
            main.style.flexBasis = "100%";
            menuGrid = document.querySelector(".menuGrid");
            menuGrid.classList.remove("col-3");
          }
        }, 500);
      });
    });

    qty = document.querySelectorAll(".qty");

    qty.forEach((e) => {
      e.addEventListener("click", () => {
        pastEdit = document.querySelector(".edit");
        if (pastEdit != null) pastEdit.classList.remove("edit");
        e.classList.add("edit");
      });
    });
    items.innerHTML = qty.length;
    tBill = 0;
    totals.forEach((e) => {
      tBill += Number(e.innerHTML);
    });
    bill.innerHTML = tBill;
    if (!tBill) {
      console.log('l');
      menuGrid = document.querySelector(".menuGrid");
      menuGrid.classList.remove("col-3");
    }
  });

});

cancelBtn.addEventListener("click", () => {
  orderContainer.innerHTML = "";
  items.innerHTML = 0;
  bill.innerHTML = 0;
});

orderNowBtn.addEventListener("click", () => {
  if (items.innerHTML != "0") {
    orderNowBtnArr.forEach(e => {
      display(e.vname, e.value, e.command, e.class);
    })
    body.classList.add("animation");
    if (takeAway.classList.contains("active")) {
      let name = "";
      orderItem = document.querySelectorAll(".orderItem");
      orderItem.forEach((e) => {
        console.log(e.children[1].children[0].children[1]);
        name += `${e.children[0].children[0].innerHTML} ${e.children[1].children[0].children[0].innerHTML}, `;
      });
      name = name.slice(0, -2);
      order.push({
        description: name,
        amount: Number(bill.innerHTML),
      });
      localStorage.setItem("takeAway", JSON.stringify(order));
      print();
    }
  }
});

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

let array = [];
let itemNames = "";
let itemPrice = "";
let itemqty = "";
let amount = "";
let totalAmount = "";

reserveTableBtn.addEventListener("click", (e) => {
  allTables.forEach((t) => {
    if (t.classList.contains("new")) {
    }
  });
});
btns.forEach((e) => {
  e.addEventListener("click", (e) => {
    let qty = document.querySelector(".edit");
    let eClass = e.target.classList;
    let eText = e.target.textContent;
    if (!eClass.contains("pressedBtn")) {
      eClass.add("pressedBtn");
    }
    setTimeout(() => {
      eClass.remove("pressedBtn");
    }, 600);
    if (qty != null) {
      if (Number(eText)) {
        qtyEdit(qty, eText);
      }
      if (eText == "0") {
        qtyEdit(qty, eText);
      }
      if (eText == "Del") {
        let value = qty.innerHTML;
        value = value.slice(0, -1);
        if (value == "") value = 0;
        qty.innerHTML = value;
      }
      if (eText == "Enter") {
        qty.classList.remove("once");
        qty.classList.remove("edit");
      }
      updatePrice(qty);
    }
  });
});
function print() {
  if (localStorage.getItem("takeAway")) {
    console.log(localStorage.getItem("takeAway"));
  } else {
    console.log('empty');
  }
}
function updatePrice(qty) {
  let price = qty.parentElement.nextElementSibling.children[0].innerHTML;
  price = price.split("x");
  price = Number(price[1]);
  let tPrice = qty.parentElement.nextElementSibling.children[1];
  tPrice.innerHTML = price * Number(qty.innerHTML);
  tBill = 0;
  totals.forEach((e) => {
    tBill += Number(e.innerHTML);
  });
  bill.innerHTML = tBill;
}

function categoriesSelection(category, order) {
  if (category.classList.contains("active")) {
    category.classList.remove("active");
    order.style.display = "none";
  }
}
function qtyEdit(e, x) {
  if (e.classList.contains("once")) {
    e.innerHTML += x;
  }
  if (!e.classList.contains("once")) {
    e.classList.add("once");
    e.innerHTML = x;
  }
}
function display(variableName, value, command, cName) {
  if (value != null) {
    if (command == "flexBasis") {
      variableName.style.flexBasis = value;
    } else {
      variableName.style.display = value;
    }
  }
  if (command == "add") {
    variableName.classList.add(cName);
  }
  if (command == "remove") {
    variableName.classList.remove(cName);
  }
}
