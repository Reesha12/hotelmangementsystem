const booking_Link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/booking";

fetch(booking_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#bookingtable tbody");

    data.forEach(b=>{
        const row = document.createElement("tr");

        row.innerHTML=`
        <td>${b.booking_id}</td>
        <td>${b.customerid}</td>
        <td>${b.room_id}</td>
        <td>${b.check_in}</td>
        <td>${b.check_out}</td>
        <td>${b.booking_date}</td>
        `;

        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);
});