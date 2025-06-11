const billing_Link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/billing";

// Fetch and display billing records
function fetchBillings() {
  fetch(billing_Link)
    .then(response => {
      if (!response.ok) throw new Error("Failed to fetch billing data");
      return response.json();
    })
    .then(data => {
      const tbody = document.querySelector("#billingtable tbody");
      if (!tbody) return;

      tbody.innerHTML = ""; // clear existing

      data.forEach(b => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${b.bill_id}</td>
          <td>${b.invoice_id}</td>
          <td>${b.payment_id}</td>
          <td>${b.billing_date}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => {
      console.error(err.message);
      const tbody = document.querySelector("#billingtable tbody");
      if (tbody) {
        tbody.innerHTML = `<tr><td colspan="4" class="text-danger">Error: ${err.message}</td></tr>`;
      }
    });
}

// Call on load
fetchBillings();

// Add new billing
const saveBillingBtn = document.getElementById("saveBillingBtn");

if (saveBillingBtn) {
  saveBillingBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const invoice_id = document.getElementById("invoiceId").value.trim();
    const payment_id = document.getElementById("paymentId").value.trim();
    const billing_date = document.getElementById("billingDate").value;

    if (!invoice_id || !payment_id || !billing_date) {
      alert("Please fill in all fields.");
      return;
    }

    // NOTE: invoice_id and payment_id are strings like "I001" and "P1001"
    const newBilling = {
      invoice_id: invoice_id,
      payment_id: payment_id,
      billing_date: billing_date
    };

    try {
      const res = await fetch(billing_Link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBilling)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to add billing");
      }

      bootstrap.Modal.getInstance(document.getElementById('addBillingModal')).hide();
      document.getElementById("addBillingForm").reset();
      alert("Billing added successfully!");
      fetchBillings();

    } catch (err) {
      alert(err.message || "Error adding billing.");
    }
  });
}
