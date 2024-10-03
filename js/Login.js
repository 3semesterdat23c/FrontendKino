document.getElementById("login-form").addEventListener("submit", async function (event) {
    event.preventDefault();

    const brugernavn = document.getElementById("brugernavn").value;
    const password = document.getElementById("password").value;

    try {
        //Skal lige tjekke at path'en er korrekt
        const response = await fetch("http://localhost:8080/admin/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: brugernavn,
                password: password
            })
        });

        if (response.ok) {
            alert("Du er nu logget ind som admin");
            window.location.href //HER SKAL VORES HTML SIDE SOM MAN SKAL VIDERE TIL VÆRE
        } else {
            document.getElementById("error-message").style.display = "block";
        }
    } catch (error) {
        console.error("Error", error);
        document.getElementById("error-message").innerText = "Der skete en fejl, prøv igen!";
        document.getElementById("error-message").style.display= "block";

    }
})