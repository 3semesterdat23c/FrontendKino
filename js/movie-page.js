document.getElementById("movie-page-form").addEventListener("get", async function (event) {
    event.preventDefault();


    try {
        const response = await fetch(`http://localhost:8080/movie/${movieId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },

        });

        if (response.ok) {
            window.location.href = 'movie-page2.html';//HER SKAL VORES HTML SIDE SOM MAN SKAL VIDERE TIL VÆRE
        } else {
            document.getElementById("error-message").style.display = "block";
        }
    } catch (error) {
        console.error("Error", error);
        document.getElementById("error-message").innerText = "Der skete en fejl, prøv igen!";
        document.getElementById("error-message").style.display= "block";

    }
})