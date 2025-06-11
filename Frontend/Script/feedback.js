const feedback_Link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/feedback";

// Fetch and display feedback
async function fetchFeedback() {
    try {
        const response = await fetch(feedback_Link);
        if (!response.ok) throw new Error("Failed to fetch data from given URL");

        const data = await response.json();
        const tbody = document.querySelector("#feedbacktable tbody");
        tbody.innerHTML = ""; // Clear old data

        data.forEach(f => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${f.feedback_id}</td>
                <td>${f.customerid}</td>
                <td>${f.booking_id}</td>
                <td>${f.rating}</td>
                <td>${f.comments}</td>
                <td>${f.date}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (err) {
        console.error(err.message);
        const tbody = document.querySelector("#feedbacktable tbody");
        tbody.innerHTML = `<tr><td colspan="6" class="text-danger">Error loading feedback: ${err.message}</td></tr>`;
    }
}

// Call fetch on page load
fetchFeedback();

// Handle insert feedback
document.getElementById("saveFeedbackBtn").addEventListener("click", async (e) => {
    e.preventDefault();

    const customerId = document.getElementById("customerId").value.trim();
    const bookingId = document.getElementById("bookingId").value.trim();
    const rating = document.getElementById("rating").value.trim();
    const comments = document.getElementById("comments").value.trim();
    const date = document.getElementById("date").value.trim();

    if (!customerId || !bookingId || !rating || !comments || !date) {
        alert("Please fill in all fields.");
        return;
    }

    const newFeedback = {
        customerid: customerId,
        booking_id: bookingId,
        rating: parseInt(rating),
        comments: comments,
        date: date
    };

    try {
        const response = await fetch(feedback_Link, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newFeedback)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Failed to submit feedback.");
        }

        // Close modal if using Bootstrap
        const modalEl = document.getElementById("addFeedbackModal");
        if (modalEl) {
            const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
            modal.hide();
        }

        // Reset form
        const form = document.getElementById("addFeedbackForm");
        if (form) form.reset();

        alert("Feedback submitted successfully!");
        fetchFeedback(); // Refresh table
    } catch (err) {
        console.error("Error adding feedback:", err);
        alert(err.message || "Error adding feedback.");
    }
});
