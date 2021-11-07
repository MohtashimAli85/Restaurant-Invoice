export function orderItemComponent(name, qty, price, total) {
    return `<div class="orderItem orderItemAnimation">
        <div class="orderName d-flex">
            <h5>${name}</h5>
            <img src="../../assets/deleteIcon.svg" alt="delete icon" class="delImg">
        </div>
        <div class="orderPrice d-flex">
            <div class="count d-flex">
                <p class="qty new">${qty}</p>
            </div>
            <div class="calculation d-flex">
                <p class="price">x ${price}</p>
                <p class="total">${total}</p>
            </div>
        </div>
    </div>`;
}