const billing_Link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/billing";

fetch(billing_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#billingtable tbody");

    data.forEach(bill=>{
        const row = document.createElement("tr");

        row.innerHTML=`
        <td>${bill.bill_id}</td>
        <td>${bill.invoice_id}</td>
        <td>${bill.payment_id}</td>
        <td>${bill.billing_date}</td>
        `;

        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);
});