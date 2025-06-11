const inventory_link = "https://redesigned-chainsaw-wr4g5vjwwg9629xjr-6006.app.github.dev/inventory";

// Function to fetch and display inventory
async function fetchInventory() {
    try {
        const response = await fetch(inventory_link);
        if (!response.ok) throw new Error("Failed to Fetch data from given URL");

        const data = await response.json();
        const tbody = document.querySelector("#inventorytable tbody");
        tbody.innerHTML = ""; // Clear existing rows

        data.forEach(item => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${item.item_id}</td>
                <td>${item.item_name}</td>
                <td>${item.category}</td>
                <td>${item.quantity_in_stock}</td>
                <td>${item.unit}</td>
                <td>${item.restock_level}</td>
            `;

            tbody.appendChild(row);
        });
    } catch (err) {
        console.error(err.message);
        const tbody = document.querySelector("#inventorytable tbody");
        tbody.innerHTML = `<tr><td colspan="6" class="text-danger">Error loading inventory: ${err.message}</td></tr>`;
    }
}

// Initial call
fetchInventory();

// Insert item method
const saveInventoryBtn = document.getElementById('saveInventoryBtn');

if (saveInventoryBtn) {
    saveInventoryBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        // Get input values from form
        const itemName = document.getElementById('itemName').value.trim();
        const category = document.getElementById('category').value.trim();
        const quantity = document.getElementById('quantity').value.trim();
        const unit = document.getElementById('unit').value.trim();
        const restockLevel = document.getElementById('restockLevel').value.trim();

        // Basic validation
        if (!itemName || !category || !quantity || !unit || !restockLevel) {
            alert("Please fill in all fields.");
            return;
        }

        const newItem = {
            item_name: itemName,
            category: category,
            quantity_in_stock: parseInt(quantity),
            unit: unit,
            restock_level: parseInt(restockLevel)
        };

        try {
            const response = await fetch(inventory_link, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newItem)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to add inventory item.");
            }

            // Close Bootstrap modal
            const modalEl = document.getElementById('addInventoryModal');
            if (modalEl) {
                const modal = bootstrap.Modal.getInstance(modalEl) || new bootstrap.Modal(modalEl);
                modal.hide();
            }

            // Reset the form
            const form = document.getElementById('addInventoryForm');
            if (form) form.reset();

            alert("Inventory item added successfully!");
            fetchInventory(); // Refresh the table
        } catch (err) {
            console.error("Error adding inventory item:", err);
            alert(err.message || "Failed to add inventory item.");
        }
    });
} else {
    console.warn("saveInventoryBtn not found!");
}
