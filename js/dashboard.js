document.getElementById("create-admin-btn").addEventListener("click", function() {
    document.getElementById("create-admin-modal").style.display = "block";
});

document.getElementById("create-admin-form").addEventListener("submit", async function(event) {
    event.preventDefault();

    const username = document.getElementById("new-username").value;
    const password = document.getElementById("new-password").value;
    const fullName = document.getElementById("new-fullname").value;

    try {
        const response = await fetch("http://localhost:8080/admin/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: username,
                password: password,
                fullName: fullName
            })
        });

        if (response.ok) {
            alert("Admin registered successfully");
            // Optionally, reset the form or close the modal
            document.getElementById("create-admin-form").reset();
            document.getElementById("create-admin-modal").style.display = "none";
        } else {
            const errorText = await response.text();
            alert("Error: " + errorText);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while registering the admin.");
    }
});
document.getElementById("edit-movie-btn").addEventListener("click", function() {
    window.location.href = "edit-moviepage.html";
});
