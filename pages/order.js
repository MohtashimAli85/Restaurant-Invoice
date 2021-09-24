import { tables } from "./tables.js";
import { backBtnArr } from "./test.js";
import { assignTables, car, orderNowBtn, reserveTableBtn, tableOrder, carOrder, takeAway, categories, orderSelection } from './test.js';



let delBtns = document.querySelectorAll(".delImg");
let cancelBtn = document.querySelector(".cancel");
let backBtn = document.querySelector(".backBtn");
const orderContainer = document.querySelector(".orderContainer");
let orderItem = document.querySelectorAll(".orderItem");
const takeAwayOrder = document.querySelector(".takeAwayOrder");

let items = document.querySelector(".items");
let bill = document.querySelector(".bill");
let totals = document.querySelectorAll(".total");
let input = document.querySelector(".form__field");
let label = document.querySelector(".form__label");
let btns = document.querySelectorAll(".btn");
let order = [];
let item = "",
  allcircles = "",
  allTables = "",
  qty = "";

item = "";
let name = "",
  price = "",
  tBill = 0,
  count = 1,
  total = 0;
const addBtn = document.querySelectorAll(".addBtn");
addBtn.forEach((e) => {
  e.addEventListener("click", (e) => {
    item = e.target.previousElementSibling;

    name = item.firstElementChild;
    price = item.children[1];
    price = price.innerHTML;
    price = price.split(".");
    if (name.innerHTML.includes('PD')) {
      console.log(price);
      price[1] = Math.round(Number(price[1]) / 12);
    }
    item = `<div class="orderItem orderItemAnimation">
        <div class="orderName d-flex">
            <h5>${name.innerHTML}</h5>
            <img src="../assets/delete-icon.svg" alt="delete icon" class="delImg">
        </div>
        <div class="orderPrice d-flex">
            <div class="count d-flex">
                <p class="qty">1</p>
            </div>
            <div class="calculation d-flex">
                <p class="price">x ${price[1]}</p>
                <p class="total">${price[1]}</p>
            </div>
        </div>
    </div>`;
    orderContainer.innerHTML += item;
    setTimeout(() => {
      document.querySelectorAll(".orderItem").forEach((e) => {
        e.classList.remove("orderItemAnimation");
      });
    }, 100);

    delBtns = document.querySelectorAll(".delImg");
    totals = document.querySelectorAll(".total");
    orderItem = document.querySelectorAll(".orderItem");

    item = "";
    delBtns.forEach((e) => {
      e.addEventListener("click", (e) => {
        e.target.parentNode.parentNode.classList.add('orderItemAnimationR');
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
          console.log(tBill);
          bill.innerHTML = tBill;
        }, 500);


      });
    });

    let qty = document.querySelectorAll(".qty");
    let tcount = 0;
    qty.forEach((e) => {
      tcount += Number(e.innerHTML);
      e.addEventListener("click", () => {
        // e.contentEditable = true;
        // e.focus();
        // document.execCommand('selectAll', false, null);
        e.classList.add('edit');
      });
    });
    items.innerHTML = tcount;
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
});

orderNowBtn.addEventListener("click", () => {
  if (items.innerHTML != "0") {

    categories.style.display = "none";
    categories.classList.remove("animation");
    orderSelection.style.display = "block";
    orderSelection.classList.add("animation");
    if (takeAway.classList.contains("active")) {
      let name = "";
      orderItem.forEach((e) => {
        name += `${e.children[0].children[0].innerHTML} ${e.children[1].children[0].children[1].innerHTML}, `;
      });
      name = name.slice(0, -2);
      order.push({
        description: name,
        amount: Number(bill.innerHTML),
      });
    }
  }
});


backBtn.addEventListener("click", (e) => {
  backBtnArr.forEach(e => {
    display(e.vname, e.value, e.command, e.class);;
  })
});
function display(variableName, value, command, cName) {
  if (value != "")
    variableName.style.display = value;
  if (command == "add") {
    variableName.classList.add(cName);
  }
  if (command == "remove") {
    variableName.classList.add(cName);
  }
}
assignTables.addEventListener("click", (e) => {
  categoriesSelection(car, carOrder);
  if (takeAway.classList.contains("active")) {
    takeAway.classList.remove("active");
  }
  assignTables.classList.add("active");
  tableOrder.style.display = "grid";
  tableOrder.classList.add("animation");
  reserveTableBtn.style.display = "block";
  reserveTableBtn.classList.add("reserveActive");
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
  carOrder.style.display = "block";
  carOrder.classList.add("animation");
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
btns.forEach(e => {
  e.addEventListener("click", (e) => {
    if (Number(e.target.textContent)) {
      document.querySelector('.edit').innerHTML = e.target.textContent;
    }
  });
});
function categoriesSelection(category, order) {
  if (category.classList.contains("active")) {
    category.classList.remove("active");
    order.style.display = "none";
  }
}