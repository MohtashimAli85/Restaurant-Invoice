export function fillPrintData(itemArr, invoicep, invoicepTfoot, command) {
    let item = "", totalAmount = 0;
    itemArr.forEach(e => {
        let price = e.price;
        price = price.substr(2);
        item += `<tr>
                        <td>${e.itemName}</td>
                        <td>${e.qty}</td>
                        <td>${price}</td>
                        <td>${e.total}</td>
                    </tr>`;
        totalAmount += Number(e.total);
    });
    invoicep.innerHTML = item;
    item = ""
    let serviceTax = Math.round(totalAmount * 0.03);
    totalAmount += serviceTax;
    let serviceTaxHtml = `<tr>
                        <td colspan="3">Service Tax</td>

                        <td>${serviceTax}</td>
                </tr>`;
    if (command == "takeAway") {
        serviceTaxHtml = "";
    }
    item += `<colgroup>
                <col width="60%" />
                <col width="10%" />
                <col width="15%" />
                <col width="15%" />
              </colgroup>
              ${serviceTaxHtml}
                <tr>
                        <td colspan="3">Total</td>

                        <td class="tkta">${totalAmount}</td>
                </tr>`;

    invoicepTfoot.innerHTML = item;
}

export function printInfofn(printInfo, orderId) {
    let dt = new Date();
    printInfo.innerHTML = `<h4>Order ID: ${orderId.length > 0 ? orderId.length : orderId.length + 1}</h4>
                               <h4>Date: ${String(dt.getDay()).length > 1 ? dt.getDay() : '0' + dt.getDay()}/${dt.getMonth()}/${dt.getFullYear()}</h4>`;
}
export function startPrint(arr) {
    let invoice = document.querySelector(".invoice"),
        invoicep = document.querySelector(".invoicep"),
        invoiceTfoot = document.querySelector(".invoiceTfoot"), invoicepTfoot = document.querySelector(".invoicepTfoot"),
        printInfo = document.querySelector(".printInfo"),
        item = ""; totalAmount = 0;
    fillPrintData(arr, invoice, invoicep, invoiceTfoot, invoicepTfoot, "takeAway");
    orderId = document.querySelectorAll('.orderID');
    printInfofn(printInfo, orderId);
}