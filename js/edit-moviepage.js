// Modal elementer
const modal = document.getElementById("edit-movie-modal");
const closeModalButton = document.getElementById("close-modal");
const cancelButton = document.getElementById("cancel-button");
const saveButton = document.getElementById("save-button");

// Input elementer
const searchInput = document.getElementById("searched-movie");
const searchButton = document.getElementById("search-button");
const titleInput = document.getElementById("movie-title");
const descriptionInput = document.getElementById("movie-description");
const releaseYearInput = document.getElementById("movie-release-year");
const genreInput = document.getElementById("movie-genre");

let currentMovieId = null; // For at holde styr på den aktuelle film

// Funktion til at søge en film
searchButton.addEventListener("click", function () {
    const movieTitle = searchInput.value;

    if (movieTitle) {
        fetch(`/movies`)
            .then(response => response.json())
            .then(movies => {
                if (movies.length > 0) {
                    // Vi antager at den første film matcher søgningen
                    const movie = movies[0];
                    currentMovieId = movie.movieId; // Gemmer film ID

                    // Fyld modal med film data
                    titleInput.value = movie.title;
                    descriptionInput.value = movie.description;
                    releaseYearInput.value = movie.releaseYear;
                    genreInput.value = movie.genre;

                    // Åbn modal
                    modal.classList.add("modal-open");
                } else {
                    alert("Ingen film fundet.");
                }
            })
            .catch(error => console.error("Fejl ved hentning af film:", error));
    } else {
        alert("Indtast venligst en film titel.");
    }
});

// Luk modal ved klik på kryds eller annuller
closeModalButton.addEventListener("click", function () {
    modal.classList.remove("modal-open");
});

cancelButton.addEventListener("click", function () {
    modal.classList.remove("modal-open");
});

// Gem opdateringer til film
saveButton.addEventListener("click", function (e) {
    e.preventDefault();

    const updatedMovie = {
        title: titleInput.value,
        description: descriptionInput.value,
        releaseYear: releaseYearInput.value,
        genre: genreInput.value
    };

    if (currentMovieId) {
        fetch(`/movie/${currentMovieId}`, {
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
    }
});
