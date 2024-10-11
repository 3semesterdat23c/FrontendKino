document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const brugernavn = document.getElementById("brugernavn").value;
    const password = document.getElementById("password").value;

    try {
        // Ensure the path is correct
        const response = await fetch("https://gaakma-cferd8embuayf3e7.northeurope-01.azurewebsites.net/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: brugernavn,
                password: password
            }),
            credentials: "include" // Include credentials (cookies) in the request
        });

        if (response.ok) {
            alert("Du er nu logget ind som admin");
            window.location.href = 'admin_dashboard.html'; // Redirect to the admin dashboard
        } else {
            document.getElementById("error-message").style.display = "block";
        }
    } catch (error) {
        console.error("Error", error);
        document.getElementById("error-message").innerText = "Der skete en fejl, prøv igen!";
        document.getElementById("error-message").style.display = "block";
    }
});