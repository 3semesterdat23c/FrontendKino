// edit-admin.js

document.getElementById('edit-admin-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const adminId = document.getElementById('adminId').value;
    const username = document.getElementById('username').value;
    const fullName = document.getElementById('fullName').value;
    const password = document.getElementById('password').value;

    const adminDetails = {
        username: username,
        fullName: fullName,
        password: password // Include only if changing password
    };

    try {
        const response = await fetch(`http://localhost:8080/admin/${adminId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(adminDetails)
        });

        if (response.ok) {
            const updatedAdmin = await response.json();
            alert('Admin updated successfully!');
            // Redirect or update the UI accordingly
        } else {
            const errorText = await response.text();
            alert('Error updating admin: ' + errorText);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while updating the admin.');
    }
});
