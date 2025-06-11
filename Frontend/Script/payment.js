const payment_Link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/payment";

fetch(payment_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#paymenttable tbody");

    data.forEach(p=>{
        const row = document.createElement("tr");

        row.innerHTML=`
        <td>${p.paymentid}</td>
        <td>${p.bookingid}</td>
        <td>${p.amount}</td>
        <td>${p.paymentdate}</td>
        <td>${p.paymentmethod}</td>
        <td>${p.status}</td>
        `;

        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);
    tbody.innerHTML = `<tr><td colspan="5" class="text-danger">Error: ${err.message}</td></tr>`;
    });

fetchPayments(); // Load on page

// Submit payment
document.getElementById("savePaymentBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const booking_id = document.getElementById("bookingId").value.trim();
  const amount = document.getElementById("amount").value.trim();
  const method = document.getElementById("method").value.trim();
  const date = document.getElementById("paymentDate").value;

  if (!booking_id || !amount || !method || !date) {
    alert("Please fill in all fields");
    return;
  }

  const newPayment = {
    booking_id: parseInt(booking_id),
    amount: parseFloat(amount),
    method,
    date
  };

  try {
    const res = await fetch(payment_Link, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newPayment)
    });

    if (!res.ok) {
      const errData = await res.json();
      throw new Error(errData.error || "Failed to add payment");
    }

    bootstrap.Modal.getInstance(document.getElementById("addPaymentModal")).hide();
    document.getElementById("addPaymentForm").reset();
    alert("Payment added successfully!");
    fetchPayments();
  } catch (err) {
    alert(err.message || "Error adding payment.");
  }
});