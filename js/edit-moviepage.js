// Modal elements
const modal = document.getElementById("edit-movie-modal");
const closeModalButton = document.getElementById("close-modal");
const cancelButton = document.getElementById("cancel-button");
const saveButton = document.getElementById("save-button");

// Input elements
const searchInput = document.getElementById("searched-movie");
const searchButton = document.getElementById("search-button");
const titleInput = document.getElementById("movie-title");
const descriptionInput = document.getElementById("movie-description");
const releaseYearInput = document.getElementById("movie-release-year");
const genreInput = document.getElementById("movie-genre");

let currentMovieId = null; // To keep track of the current movie
const backendUrl = 'http://localhost:8080'; // Replace with your backend's URL and port

searchButton.addEventListener("click", function () {
    const movieTitle = searchInput.value.trim();

    if (movieTitle) {
        fetch(`${backendUrl}/movies/search?title=${encodeURIComponent(movieTitle)}`)
            .then(response => {
                if (!response.ok) {
                    if (response.status === 404) {
                        throw new Error("Ingen film fundet.");
                    } else {
                        throw new Error("Fejl ved hentning af film.");
                    }
                }
                return response.json();
            })
            .then(movies => {
                if (movies.length > 0) {
                    // For simplicity, take the first movie that matches
                    const movie = movies[0];
                    currentMovieId = movie.movieId;

                    // Fill the modal with movie data
                    titleInput.value = movie.title;
                    descriptionInput.value = movie.description;
                    releaseYearInput.value = movie.year;
                    genreInput.value = movie.actors;

                    // Open the modal
                    modal.classList.add("modal-open");
                } else {
                    alert("Ingen film fundet.");
                }
            })
            .catch(error => alert(error.message));
    } else {
        alert("Indtast venligst en film titel.");
    }
});
saveButton.addEventListener("click", function (e) {
    e.preventDefault();

    const updatedMovie = {
        movieId: currentMovieId, // Include the movieId in the payload
        title: titleInput.value.trim(),
        description: descriptionInput.value.trim(),
        releaseYear: parseInt(releaseYearInput.value, 10),
        genre: genreInput.value.trim()
    };

    if (currentMovieId) {
        fetch(`/movies/${currentMovieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMovie),
        })
            .then(response => {
                if (response.ok) {
                    alert("Filmen er blevet opdateret!");
                    modal.classList.remove("modal-open");
                } else {
                    alert("Der opstod en fejl under opdateringen.");
                }
            })
            .catch(error => console.error("Fejl ved opdatering af film:", error));
    } else {
        alert("Ingen film valgt til opdatering.");
    }
});

