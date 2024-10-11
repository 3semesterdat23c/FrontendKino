
fetch('https://gaakma-cferd8embuayf3e7.northeurope-01.azurewebsites.net/movies')
    .then(response => response.json())
    .then(data => {
        const moviesGrid = document.getElementById('moviesGrid');
        data.forEach(movie => {
            const movieItem = document.createElement('div');
            movieItem.classList.add('movie-item');

            movieItem.innerHTML = `
                <div class="poster">
                    <a href="movie_detail.html?id=${movie.movieId}">
                        <img src="${movie.poster}" alt="${movie.title} Poster">
                    </a>
                </div>
                <div class="title">${movie.title}</div>
            `;

            moviesGrid.appendChild(movieItem);
        });
    })
    .catch(error => console.error('Error fetching movies:', error));

document.getElementById("admin-dashboard-btn").addEventListener("click", async function () {
    const isAdmin = await userIsAdmin();
    if (isAdmin) {
        window.location.href = "admin_dashboard.html";
    } else {
        window.location.href = "Login.html";
    }
});

async function userIsAdmin() {
    try {
        const response = await fetch("https://gaakma-cferd8embuayf3e7.northeurope-01.azurewebsites.net/admin/check-admin-presence", {
            method: "GET",
            credentials: "include" // Include credentials for session management
        });
        return response.ok;
    } catch (error) {
        console.error("Error checking admin session:", error);
        return false;
    }
}