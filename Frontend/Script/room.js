const room_link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/room"; 

fetch(room_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#roomtable tbody");

    data.forEach(r=>{
        const row = document.createElement("tr");

  row.innerHTML=`
         <td>${r.room_id}</td>
        <td>${r.room_number}</td>
        <td>${r.room_type}</td>
        <td>${r.pricepernight}</td>
        <td>${r.availabilitystatus}</td>
        `;

        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);
});