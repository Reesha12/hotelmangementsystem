const invoice_Link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/invoice";

fetch(invoice_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#invoicetable tbody");

    data.forEach(i=>{
        const row = document.createElement("tr");

        row.innerHTML=`
        <td>${i.invoice_id}</td>
        <td>${i.booking_id}</td>
        <td>${i.total_amount}</td>
        <td>${i.issue_date}</td>
        `;

        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);
});