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
        <td>${s.description}</td>
        <td>${s.price}</td>
        `;

        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);
    const tbody = document.querySelector("#servicetable tbody");
        tbody.innerHTML = `<tr><td colspan="5" class="text-danger">Error loading service data: ${err.message}</td></tr>`;
    });


// Call fetchServices initially to load data on page load
fetchServices();

// Add new service
const saveServiceBtn = document.getElementById('saveServiceBtn');

if (saveServiceBtn) {
    saveServiceBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        const serviceName = document.getElementById('serviceName').value.trim();
        const description = document.getElementById('description').value.trim();
        const price = document.getElementById('price').value.trim();
        const duration = document.getElementById('duration').value.trim();

        // Basic validation
        if (!serviceName || !description || !price || !duration) {
            alert('Please fill in all required fields');
            return;
        }

        const newService = {
            service_name: serviceName,
            description: description,
            price: parseFloat(price),
            duration: duration
        };

        try {
            const response = await fetch(service_Link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newService)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add service');
            }

            // Close modal (assuming Bootstrap modal)
            const modalEl = document.getElementById('addServiceModal');
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                modal.hide();
            }

            // Refresh data
            fetchServices();

            // Reset form
            const form = document.getElementById('addServiceForm');
            if (form) form.reset();

            // Success alert
            alert('Service added successfully!');
        } catch (err) {
            console.error('Error adding service:', err);
            alert(err.message || 'Failed to add service');
        }
    });
} else {
    console.warn('saveServiceBtn element not found!');
}
