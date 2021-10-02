let orderArray = localStorage.getItem('takeAway')
    ? JSON.parse(localStorage.getItem('takeAway'))
    : [];

let orders = document.querySelector("#orders");
let rows = "";
let orderId = 1;
if (orderArray) {
    orderArray.forEach(e => {
        rows += `<tr>
        <td class="orderID">#${orderId}</td>
              <td>
                ${e.description}
              </td>
              <td class="amount">${e.amount}</td>
              </tr>`;
        orderId++;
    })
    orders.innerHTML = rows;
    // console.log(orderArray);
} else {
    console.log(orderArray + " else");

}
let amount = document.querySelectorAll('.amount');
let total = document.querySelector('.total');
let totalAmount = 0;
amount.forEach(e => {
    totalAmount += Number(e.innerHTML);
});

total.innerHTML = totalAmount;
console.log('working')