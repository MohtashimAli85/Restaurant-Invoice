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

const assignTables = document.querySelector(".tables");
const car = document.querySelector(".car");
const takeAway = document.querySelector(".takeAway");

let delBtns = document.querySelectorAll(".delImg");
let minusBtns = document.querySelectorAll(".minusBtn");
let plusBtns = document.querySelectorAll(".plusBtn");
let cancelBtn = document.querySelector(".cancel");
let orderNowBtn = document.querySelector(".orderNow");
let backBtn = document.querySelector(".backBtn");
let reserveTableBtn = document.querySelector(".reserveTable");
const orderContainer = document.querySelector(".orderContainer");
const categories = document.querySelector(".categories");
const orderSelection = document.querySelector(".orderSelection");
let orderItem = document.querySelectorAll(".orderItem");

const tableOrder = document.querySelector(".tableOrder");
const carOrder = document.querySelector(".carOrder");
const takeAwayOrder = document.querySelector(".takeAwayOrder");

let items = document.querySelector(".items");
let bill = document.querySelector(".bill");
let totals = document.querySelectorAll(".total");
let input = document.querySelector(".form__field");
let label = document.querySelector(".form__label");
let order = [];
let item = "",
  allcircles = "",
  allTables = "",
  qty = "";
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
    if(name.innerHTML.includes('PD')){
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
        setTimeout(() =>{
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
        },500);
        
        
      });
    });

    minusBtns = document.querySelectorAll(".minusBtn");
    plusBtns = document.querySelectorAll(".plusBtn");
    minusBtns.forEach((e) => {
      e.addEventListener("click", (e) => {
        count = Number(e.target.nextElementSibling.innerHTML);
        let price =
          e.target.parentNode.nextElementSibling.children[0].innerHTML;
        price = Number(price.split(" ")[1]);
        total = Number(
          e.target.parentNode.nextElementSibling.children[1].innerHTML
        );
        if (count == 1) {
          return;
        } else {
          count--;
          e.target.nextElementSibling.innerHTML = count;
          total = price * count;
          e.target.parentNode.nextElementSibling.children[1].innerHTML = total;
          let qty = document.querySelectorAll(".qty");
          let tcount = 0;
          qty.forEach((e) => {
            tcount += Number(e.innerHTML);
          });
          items.innerHTML = tcount;
          tBill = 0;
          totals.forEach((e) => {
            tBill += Number(e.innerHTML);
          });
          bill.innerHTML = tBill;
        }
      });
    });
    plusBtns.forEach((e) => {
      e.addEventListener("click", (e) => {
        count = Number(e.target.previousElementSibling.innerHTML);
        let price =
          e.target.parentNode.nextElementSibling.children[0].innerHTML;
        price = Number(price.split(" ")[1]);
        total = Number(
          e.target.parentNode.nextElementSibling.children[1].innerHTML
        );
        count++;
        e.target.previousElementSibling.innerHTML = count;
        total = price * count;
        e.target.parentNode.nextElementSibling.children[1].innerHTML = total;
        let qty = document.querySelectorAll(".qty");
        let tcount = 0;
        qty.forEach((e) => {
          tcount += Number(e.innerHTML);
        });
        items.innerHTML = tcount;
        tBill = 0;
        totals.forEach((e) => {
          tBill += Number(e.innerHTML);
        });
        bill.innerHTML = tBill;
      });
    });

    let qty = document.querySelectorAll(".qty");
    let tcount = 0;
    qty.forEach((e) => {
      tcount += Number(e.innerHTML);
    });
    items.innerHTML = tcount;
    tBill = 0;
    totals.forEach((e) => {
      tBill += Number(e.innerHTML);
    });
    bill.innerHTML = tBill;
  });
});
menuOne.addEventListener("click", () => {
  if (menuTwo.classList.contains("active")) {
    document.querySelector("#menu2").style.display = "none";
    menuTwo.classList.remove("active");
  }
  if (menuThree.classList.contains("active")) {
    document.querySelector("#menu3").style.display = "none";
    menuThree.classList.remove("active");
  }
  if (menuFour.classList.contains("active")) {
    document.querySelector("#menu4").style.display = "none";
    menuFour.classList.remove("active");
  }
  document.querySelector("#menu1").style.display = "block";
  document.querySelector("#menu1").classList.add("menuAnimation");
  menuOne.classList.add("active");
});

menuTwo.addEventListener("click", () => {
  if (menuOne.classList.contains("active")) {
    document.querySelector("#menu1").style.display = "none";
    menuOne.classList.remove("active");
  }
  if (menuThree.classList.contains("active")) {
    document.querySelector("#menu3").style.display = "none";
    menuThree.classList.remove("active");
  }
  if (menuFour.classList.contains("active")) {
    document.querySelector("#menu4").style.display = "none";
    menuFour.classList.remove("active");
  }
  document.querySelector("#menu2").style.display = "block";
  document.querySelector("#menu2").classList.add("menuAnimation");
  menuTwo.classList.add("active");
});
menuThree.addEventListener("click", () => {
  if (menuOne.classList.contains("active")) {
    document.querySelector("#menu1").style.display = "none";
    menuOne.classList.remove("active");
  }
  if (menuTwo.classList.contains("active")) {
    document.querySelector("#menu2").style.display = "none";
    menuTwo.classList.remove("active");
  }
  if (menuFour.classList.contains("active")) {
    document.querySelector("#menu4").style.display = "none";
    menuFour.classList.remove("active");
  }
  document.querySelector("#menu3").style.display = "block";
  document.querySelector("#menu3").classList.add("menuAnimation");
  menuThree.classList.add("active");
});

menuFour.addEventListener("click", () => {
  if (menuOne.classList.contains("active")) {
    document.querySelector("#menu1").style.display = "none";
    menuOne.classList.remove("active");
  }
  if (menuTwo.classList.contains("active")) {
    document.querySelector("#menu2").style.display = "none";
    menuTwo.classList.remove("active");
  }
  if (menuThree.classList.contains("active")) {
    document.querySelector("#menu3").style.display = "none";
    menuThree.classList.remove("active");
  }
  document.querySelector("#menu4").style.display = "block";
  document.querySelector("#menu4").classList.add("menuAnimation");
  menuFour.classList.add("active");
});
cancelBtn.addEventListener("click", () => {
  orderContainer.innerHTML = "";
  items.innerHTML = 0;
  bill.innerHTML = 0;
});

orderNowBtn.addEventListener("click", () => {
  if (items.innerHTML != "0") {
    if (menuOne.classList.contains("active")) {
      document.querySelector("#menu1").style.display = "none";
      menuOne.classList.remove("active");
    } else if (menuTwo.classList.contains("active")) {
      document.querySelector("#menu2").style.display = "none";
      menuTwo.classList.remove("active");
    } else if (menuThree.classList.contains("active")) {
      document.querySelector("#menu3").style.display = "none";
      menuThree.classList.remove("active");
    } else if (menuFour.classList.contains("active")) {
      document.querySelector("#menu4").style.display = "none";
      menuFour.classList.remove("active");
    }
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
  categories.style.display = "block";
  categories.classList.add("animation");
  orderSelection.style.display = "none";
  orderSelection.classList.remove("animation");
  reserveTableBtn.style.display = "none";
  reserveTableBtn.classList.remove("reserveActive");
  orderNowBtn.style.display = "block";
  car.classList.remove("active");
  takeAway.classList.remove("active");
  assignTables.classList.remove("active");
  tableOrder.style.display = "none";
  carOrder.style.display = "none";
});

assignTables.addEventListener("click", (e) => {
  if (car.classList.contains("active")) {
    car.classList.remove("active");
    carOrder.style.display = "none";
  }
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
  if (assignTables.classList.contains("active")) {
    assignTables.classList.remove("active");
    tableOrder.style.display = "none";
  }
  if (takeAway.classList.contains("active")) {
    takeAway.classList.remove("active");
  }
  car.classList.add("active");
  carOrder.style.display = "block";
  carOrder.classList.add("animation");
  label.innerHTML = "Car Number";
});

takeAway.addEventListener("click", (e) => {
  if (car.classList.contains("active")) {
    car.classList.remove("active");
    car.style.display="none";
  }
  if (assignTables.classList.contains("active")) {
    assignTables.classList.remove("active");
    tableOrder.style.display = "none";
  }
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
