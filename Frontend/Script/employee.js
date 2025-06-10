const employee_Link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/employees";

fetch(employee_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#employeetable tbody");

    data.forEach(e=>{
        const row = document.createElement("tr");

        row.innerHTML=`
        <td>${e.employee_id}</td>
        <td>${e.name}</td>
        <td>${e.position}</td>
        <td>${e.email}</td>
        <td>${e.phone}</td>
        <td>${e.salary}</td>
        `;

        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);
});