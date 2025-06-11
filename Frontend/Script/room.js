const room_Link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/room"; // Replace with your actual rooms API URL

// Fetch and display rooms
function fetchRooms() {
    fetch(room_Link).then(response => {
        if (!response.ok)
            throw new Error("Failed to Fetch data from given URL");
        return response.json();
    }).then(data => {
        const tbody = document.querySelector("#roomtable tbody");
        tbody.innerHTML = ""; // Clear existing rows

        data.forEach(room => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${room.room_id}</td>
                <td>${room.room_number}</td>
                <td>${room.room_type}</td>
                <td>${room.pricepernight}</td>
                <td>${room.availabilitystatus}</td>
            `;
            tbody.appendChild(row);
        });
    }).catch(err => {
        console.error(err.message);
        const tbody = document.querySelector("#roomtable tbody");
        tbody.innerHTML = `<tr><td colspan="5" class="text-danger">Error loading room data: ${err.message}</td></tr>`;
    });
}

// Call it once on page load
fetchRooms();

// Insert new room on form submit
const saveRoomBtn = document.getElementById('saveRoomBtn');

if (saveRoomBtn) {
    saveRoomBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        const roomNumber = document.getElementById('roomNumber').value.trim();
        const roomType = document.getElementById('roomType').value.trim();
        const pricePerNight = document.getElementById('pricePerNight').value.trim();
        const availabilityStatus = document.getElementById('availabilityStatus').value.trim();

        // Basic validation
        if (!roomNumber || !roomType || !pricePerNight || !availabilityStatus) {
            alert('Please fill in all required fields');
            return;
        }

        const newRoom = {
            room_number: roomNumber,
            room_type: roomType,
            pricepernight: parseFloat(pricePerNight),
            availabilitystatus: availabilityStatus
        };

        try {
            const response = await fetch(room_Link, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRoom)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to add room');
            }

            // Close the modal (Bootstrap)
            const modalEl = document.getElementById('addRoomModal');
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                modal.hide();
            }

            // Refresh room list
            fetchRooms();

            // Reset the form
            const form = document.getElementById('addRoomForm');
            if (form) form.reset();

            alert('Room added successfully!');
        } catch (err) {
            console.error('Error adding room:', err);
            alert(err.message || 'Failed to add room');
        }
    });
} else {
    console.warn('saveRoomBtn element not found!');
}
