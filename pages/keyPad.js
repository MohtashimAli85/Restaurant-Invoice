import { updatePrice, qtyEdit } from "./function.js";
let btns = document.querySelectorAll(".btn");

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