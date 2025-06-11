const invoice_Link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/invoice";

// Function to fetch and display invoices
async function fetchInvoices() {
    try {
        const response = await fetch(invoice_Link);
        if (!response.ok) throw new Error("Failed to fetch data from given URL");
        const data = await response.json();

        const tbody = document.querySelector("#invoicetable tbody");
        tbody.innerHTML = ""; // Clear previous data

        data.forEach(i => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${i.invoice_id}</td>
                <td>${i.booking_id}</td>
                <td>${i.total_amount}</td>
                <td>${i.issue_date}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error(err.message);
        const tbody = document.querySelector("#invoicetable tbody");
        tbody.innerHTML = `<tr><td colspan="4" class="text-danger">Error loading invoice data: ${err.message}</td></tr>`;
    }
}

// Call fetchInvoices initially on page load
fetchInvoices();

const saveInvoiceBtn = document.getElementById('saveInvoiceBtn');

if (saveInvoiceBtn) {
    saveInvoiceBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        // Use correct input IDs matching your HTML form
        const bookingId = document.getElementById('bookingId').value.trim();
        const totalAmount = document.getElementById('totalAmount').value.trim();
        const issueDate = document.getElementById('issueDate').value.trim();

        // Basic validation
        if (!bookingId || !totalAmount || !issueDate) {
            alert('Please fill in all required fields');
            return;
        }

        const newInvoice = {
            booking_id: bookingId,
            total_amount: parseFloat(totalAmount),
            issue_date: issueDate
        };

        try {
            const response = await fetch(invoice_Link, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newInvoice)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add invoice');
            }

            // Close the modal (Bootstrap)
            const modalEl = document.getElementById('addInvoiceModal');
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                modal.hide();
            }

            // Refresh invoice list
            fetchInvoices();

            // Reset the form
            const form = document.getElementById('addInvoiceForm');
            if (form) form.reset();

            alert('Invoice added successfully!');
        } catch (err) {
            console.error('Error adding invoice:', err);
            alert(err.message || 'Failed to add invoice');
        }
    });
} else {
    console.warn('saveInvoiceBtn element not found!');
}
