const inventory_link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/inventory"; 

fetch(inventory_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#inventorytable tbody");

    data.forEach(item=>{
        const row = document.createElement("tr");

        row.innerHTML=`
        <td>${item.item_id}</td>
        <td>${item.item_name}</td>
        <td>${item.category}</td>
        <td>${item.quantity_in_stock}</td>
        <td>${item.unit}</td>
        <td>${item.restock_level}</td>
        `;

        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);
});