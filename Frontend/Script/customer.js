const customer_Link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/customer";

fetch(customer_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#customertable tbody");

    data.forEach(c=>{
        const row = document.createElement("tr");

        row.innerHTML=`
        <td>${c.customer_id}</td>
        <td>${c.name}</td>
        <td>${c.email}</td>
        <td>${c.phone}</td>
        <td>${c.id_proof}</td>
        `;

        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);
     const tbody = document.querySelector("#customertable tbody");
            // Fix: Use string with backticks and quotes correctly
            tbody.innerHTML = `<tr><td colspan="5" class="text-danger">Error loading customer data: ${err.message}</td></tr>`;
        });


// Call fetchCustomers initially to load data on page load
fetchCustomers();

// Make sure saveCustomerBtn exists (get from DOM)
const saveCustomerBtn = document.getElementById('saveCustomerBtn');

if (saveCustomerBtn) {
    saveCustomerBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const idProof = document.getElementById('idProof').value.trim();

        // Basic validation
        if (!name || !email || !phone || !idProof) {
            alert('Please fill in all required fields');
            return;
        }

        const newCustomer = {
            name: name,
            email: email,
            phone: phone,
            id_proof: idProof
        };

        try {
            const response = await fetch(customer_Link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newCustomer)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add customer');
            }

            // Close modal if using Bootstrap modal (adjust if you use different modal)
            const modalEl = document.getElementById('addCustomerModal');
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                modal.hide();
            }

            // Refresh data
            fetchCustomers();

            // Reset form
            const form = document.getElementById('addCustomerForm');
            if (form) form.reset();

            // Show success message
            alert('Customer added successfully!');
        } catch (err) {
            console.error('Error adding customer:', err);
            alert(err.message || 'Failed to add customer');
        }
    });
} else {
    console.warn('saveCustomerBtn element not found!');
}