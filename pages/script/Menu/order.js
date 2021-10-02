import { footer, orderNowBtnArr, orderNowBtn, takeAway } from "../Component/reset";
import { updatePrice, display } from "../function/function.js";
import { addBtn } from "./menu.js";
let delBtns = document.querySelectorAll(".delImg");
let cancelBtn = document.querySelector(".cancel");
const orderContainer = document.querySelector(".orderContainer");
let orderItem = document.querySelectorAll(".orderItem");
let items = document.querySelector(".items");
export let bill = document.querySelector(".bill");
export let totals = document.querySelectorAll(".total");
let main = document.querySelector("main");
let body = document.querySelector("body");
let menuGrid = "";
let orderArray = localStorage.getItem('takeAway')
  ? JSON.parse(localStorage.getItem('takeAway'))
  : [];
let item = "";

item = "";
let name = "",
  price = "",
  qty = "",
  newItem = "",
  tBill = 0;
if (document.querySelector(".menu1")) {
  document.querySelector(".menu1").click();
  console.log(document.querySelector(".menu1"));
}
addBtn.forEach((e) => {

  e.addEventListener("click", (e) => {
    footer.style.display = "block";
    footer.style.flexBasis = "40%";
    main.style.flexBasis = "60%";

    item = e.target.previousElementSibling;
    name = item.children[1].children[0].innerHTML;
    price = item.children[1].children[1].innerHTML;
    price = price.split(".");
    if (name.includes("PD")) {
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
          bill.innerHTML = tBill;
          if (tBill == 0) {
            footer.style.flexBasis = "0%";
            main.style.flexBasis = "100%";
            footer.style.display = "none";
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
        name += `${e.children[0].children[0].innerHTML} ${e.children[1].children[0].children[0].innerHTML}, `;
      });
      name = name.slice(0, -2);
      orderArray.push({
        description: name,
        amount: Number(bill.innerHTML),
      });
      localStorage.setItem("takeAway", JSON.stringify(orderArray));
      console.log(localStorage.getItem("takeAway"));
    }
  }
});


let array = [];
let itemNames = "";
let itemPrice = "";
let itemqty = "";
let amount = "";
let totalAmount = "";
