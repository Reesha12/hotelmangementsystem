const booking_Link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/booking";

fetch(booking_Link).then(response=>{
    if(!response.ok)
        throw new Error("Failed to Fetch data from given URL");
    return response.json();
}).then(data=>{
    const tbody = document.querySelector("#bookingtable tbody");

    data.forEach(b=>{
        const row = document.createElement("tr");

        row.innerHTML=`
        <td>${b.booking_id}</td>
        <td>${b.customerid}</td>
        <td>${b.room_id}</td>
        <td>${b.check_in}</td>
        <td>${b.check_out}</td>
        <td>${b.booking_date}</td>
        `;

        tbody.appendChild(row);
    });
}).catch(err=>{
    console.log(err.message);

    tbody.innerHTML = `<tr><td colspan="6" class="text-danger">Error: ${err.message}</td></tr>`;
    });

fetchBookings();

// Add new booking
const saveBookingBtn = document.getElementById("saveBookingBtn");
if (saveBookingBtn) {
  saveBookingBtn.addEventListener("click", async (e) => {
    e.preventDefault();

    const customer_id = document.getElementById("customerId").value.trim();
    const room_no = document.getElementById("roomNo").value.trim();
    const check_in = document.getElementById("checkIn").value;
    const check_out = document.getElementById("checkOut").value;
    const status = document.getElementById("status").value;

    if (!customer_id || !room_no || !check_in || !check_out || !status) {
      alert("Please fill in all fields.");
      return;
    }

    const newBooking = {
      customer_id: parseInt(customer_id),
      room_no: room_no,
      check_in: check_in,
      check_out: check_out,
      status: status
    };

    try {
      const res = await fetch(booking_Link, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newBooking)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to add booking");
      }

      bootstrap.Modal.getInstance(document.getElementById('addBookingModal')).hide();
      document.getElementById("addBookingForm").reset();
      alert("Booking added successfully!");
      fetchBookings();

    } catch (err) {
      alert(err.message || "Error adding booking.");
    }
  });
}
