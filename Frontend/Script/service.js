const service_Link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/service";

fetch(service_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#servicetable tbody");

    data.forEach(s=>{
        const row = document.createElement("tr");

        row.innerHTML=`
        <td>${s.service_id}</td>
        <td>${s.name}</td>
        <td>${s.description}</td>a
        <td>${s.price}</td>
        `;

        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);
});