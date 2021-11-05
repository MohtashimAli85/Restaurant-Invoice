export function fillPrintData(itemArr, invoice, invoicep, invoiceTfoot, invoicepTfoot, command) {
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
    invoice.innerHTML = item;
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
                <tr class="border-focus">
                    <td colspan="3">Received Cash</td>
                    <td class="cashrcvd"></td>
                </tr>
                <tr>
                        <td colspan="3">Total</td>

                        <td class="tkta">${totalAmount}</td>
                </tr>
                <tr>
                        <td colspan="3">Return</td>

                        <td class="cashReturn"></td>
                </tr>`;

    invoiceTfoot.innerHTML = item;
    invoicepTfoot.innerHTML = item;
}