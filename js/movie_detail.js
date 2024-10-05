
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

const movieId = getQueryParam('id');

if (movieId) {
    fetch(`http://localhost:8080/movie/${movieId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Movie not found');
            }
            return response.json();
        })
        .then(movie => {
            const movieDetailsDiv = document.getElementById('movieDetails');

            movieDetailsDiv.innerHTML = `
                <h1>${movie.title}</h1>
                <img src="${movie.poster}" alt="${movie.title} Poster">
                <p>Runtime: ${movie.runtime}</p>
                <p>Year: ${movie.year}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching movie:', error);
            document.getElementById('movieDetails').innerHTML = '<p>Error fetching movie details.</p>';
        });
} else {
    document.getElementById('movieDetails').innerHTML = '<p>No movie ID specified.</p>';
}
