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
     const tbody = document.querySelector("#employeetable tbody");
        tbody.innerHTML = `<tr><td colspan="5" class="text-danger">Error loading employee data: ${err.message}</td></tr>`;
    });


// Load data on page load
fetchEmployees();

// Handle Save Employee button
const saveEmployeeBtn = document.getElementById('saveEmployeeBtn');

if (saveEmployeeBtn) {
    saveEmployeeBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const department = document.getElementById('department').value.trim();

        if (!name || !email || !phone || !department) {
            alert('Please fill in all required fields');
            return;
        }

        const newEmployee = {
            name: name,
            email: email,
            phone: phone,
            department: department
        };

        try {
            const response = await fetch(employee_Link, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newEmployee)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add employee');
            }

            // Close modal
            const modalEl = document.getElementById('addEmployeeModal');
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                modal.hide();
            }

            // Refresh data
            fetchEmployees();

            // Reset form
            const form = document.getElementById('addEmployeeForm');
            if (form) form.reset();

            alert('Employee added successfully!');
        } catch (err) {
            console.error('Error adding employee:', err);
            alert(err.message || 'Failed to add employee');
        }
    });
} else {
    console.warn('saveEmployeeBtn element not found!');
}
