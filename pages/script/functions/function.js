import { totals, bill } from "../Menu/order.js";
export function updatePrice(qty) {
    let price = qty.parentElement.nextElementSibling.children[0].innerHTML;
    price = price.split("x");
    price = Number(price[1]);
    let tPrice = qty.parentElement.nextElementSibling.children[1];
    tPrice.innerHTML = price * Number(qty.innerHTML);
    let tBill = 0;
    totals.forEach((e) => {
        tBill += Number(e.innerHTML);
    });
    bill.innerHTML = tBill;
}

export function categoriesSelection(category, order) {
    if (category.classList.contains("active")) {
        category.classList.remove("active");
        order.style.display = "none";
    }
}
export function qtyEdit(e, x) {
    if (e.classList.contains("once")) {
        e.innerHTML += x;
    }
    if (!e.classList.contains("once")) {
        e.classList.add("once");
        e.innerHTML = x;
    }
}
export function display(variableName, value, command, cName) {
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

export function activeChecker(menu, id) {
    document.querySelector(id).style.display = "none";
    menu.classList.remove("active");

}
export function validateActive(m1, m2, m3, m4) {
    let arr = [
        {
            Vname: m1,
            id: "#menu1"
        },
        {
            Vname: m2,
            id: "#menu2"
        },
        {
            Vname: m3,
            id: "#menu3"
        },
        {
            Vname: m4,
            id: "#menu4"
        }];
    arr.forEach(e => {
        if (e.Vname.classList.contains("active")) {
            activeChecker(e.Vname, e.id);
        }
    })

}
export function menuFn(menu1, id1, menu2, id2, menu3, id3, menu4, id4) {
    menuSelection(menu1, id1);
    menuSelection(menu2, id2);
    menuSelection(menu3, id3);
    selectedMenu(menu4, id4);
}
function dataProvider(name, type, price, img, imgName) {
    return (`<div class="item d-flex">
    <div class="d-flex v-center">
        <img src="../assets/${img}.png" alt="${imgName} img">
        <div>
        <h6>${name} (${type})</h6>
        <p>Rs.${price}</p>
        </div>
    </div>
      <img src="../assets/add-icon.svg" alt="add icon" class="addIcon addBtn">
  </div>`)
};

export function fillingData(Vname, item, img, imgName, menu) {
    Vname.forEach(e => {
        item += dataProvider(e.name, e.type, e.price, img, imgName);
    });
    menu.innerHTML = item;
    item = "";
}
export function fillData() {

}