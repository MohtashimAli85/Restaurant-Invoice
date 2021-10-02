import { totals, bill } from "./order.js";
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
export function menuSelection(menu, id) {
    if (menu.classList.contains("active")) {
        document.querySelector(`${id}`).style.display = "none";
        menu.classList.remove("active");
    }
}

export function selectedMenu(menu, id) {
    document.querySelector(id).style.display = "block";
    document.querySelector(id).classList.add("menuAnimation");
    menu.classList.add("active");
}

export function activeChecker(menu, id) {
    document.querySelector(id).style.display = "none";
    menu.classList.remove("active");
}