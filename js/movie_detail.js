document.addEventListener("DOMContentLoaded", () => {
    const movieId = getQueryParam('id'); // Get the movie ID from the URL

    if (movieId) {
        fetchMovieDetails(movieId);
        fetchShowings(movieId);
    } else {
        document.getElementById('movieDetails').innerHTML = '<p>No movie ID specified.</p>';
    }

    // Function to fetch movie details from the backend
    function fetchMovieDetails(movieId) {
        fetch(`http://localhost:8080/movie/${movieId}`)
            .then(response => response.json())
            .then(movie => {
                if (movie) {
                    // Update the DOM with movie details
                    document.getElementById("movieTitle").textContent = movie.title || 'N/A';
                    document.getElementById("releaseYear").textContent = movie.year || 'N/A';
                    document.getElementById("moviePoster").src = movie.poster || 'default_poster.jpg';
                } else {
                    document.getElementById('movieDetails').innerHTML = '<p>Movie not found.</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching movie details:', error);
                document.getElementById('movieDetails').innerHTML = '<p>Error fetching movie details.</p>';
            });
    }

    // Updated fetchShowings function
    function fetchShowings(movieId) {
        fetch(`http://localhost:8080/showing/showings/${movieId}`) // Adjusted endpoint to match your backend
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const showingsList = document.getElementById("showingsList");
                showingsList.innerHTML = ""; // Clear any previous showings

                // Loop through the showings and add them to the list
                if (data && data.length > 0) {
                    data.forEach(showing => {
                        const listItem = document.createElement("li");
                        // Ensure to format the showing details correctly
                        listItem.textContent = `Theatre: ${showing.theatre.theatreId}, Date: ${showing.dateTime}`; // Adjust according to your showing properties
                        showingsList.appendChild(listItem);
                    });
                } else {
                    showingsList.innerHTML = "<li>No showings available</li>";
                }
            })
            .catch(error => {
                console.error('Error fetching showings:', error);
                const showingsList = document.getElementById("showingsList");
                showingsList.innerHTML = "<li>Error fetching showings.</li>";
            });
    }

    // Modal handling for "Add New Showing"
    const modal = document.getElementById("showingModal");
    const addShowingButton = document.getElementById("addShowingButton");
    const closeModal = document.querySelector(".close");

    addShowingButton.addEventListener("click", () => {
        modal.style.display = "block"; // Show the modal
    });

    closeModal.addEventListener("click", () => {
        modal.style.display = "none"; // Hide the modal
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none"; // Hide the modal when clicking outside
        }
    });

    // Form submission for adding a new showing
    const addShowingForm = document.getElementById("addShowingForm");
    addShowingForm.addEventListener("submit", (event) => {
        event.preventDefault(); // Prevent the form from submitting normally

        const showingData = {
            movie: { movieId: movieId },
            theatre: { theatreId: document.getElementById("theatreId").value },
            admin: { adminId: document.getElementById("adminId").value },
            dateTime: document.getElementById("dateTime").value,
            endTime: document.getElementById("endTime").value
        };

        // Send a POST request to the backend to create a new showing
        fetch("http://localhost:8080/showing/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(showingData)
        })
            .then(response => response.json())
            .then(data => {
                console.log("Showing created:", data);
                modal.style.display = "none"; // Close the modal
                fetchShowings(movieId); // Refresh the showings list
            })
            .catch(error => console.error('Error adding showing:', error));
    });
});

// Utility function to get query parameter from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}
