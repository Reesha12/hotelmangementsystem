const feedback_Link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/feedback";

fetch(feedback_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#feedbacktable tbody");

    data.forEach(f=>{
        const row = document.createElement("tr");

        row.innerHTML=`
        <td>${f.feedback_id}</td>
        <td>${f.customerid}</td>
        <td>${f.booking_id}</td>
        <td>${f.rating}</td>
        <td>${f.comments}</td>
        <td>${f.date}</td>
        `;

        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);
});