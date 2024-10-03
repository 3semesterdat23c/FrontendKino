
    fetch('http://localhost:8080/getMovies')
    .then(response => response.json())
    .then(data => {
    const moviesGrid = document.getElementById('moviesGrid');
    data.forEach(movie => {
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    movieItem.innerHTML = `
                    <div class="poster">
                        <a href="https://www.imdb.com/title/${movie.imdbID}" target="_blank">
                            <img src="${movie.poster}" alt="${movie.title} Plakat">
                        </a>
                    </div>
                    <div class="title">${movie.title}</div>
                `;


    moviesGrid.appendChild(movieItem);
});
})
    .catch(error => console.error('Fejl ved hentning af film:', error));

    document.getElementById('btn-save-movie').addEventListener('click', function() {
    const movie = {
    title: document.getElementById('input-title').value,
    year: document.getElementById('input-year').value,
    released: document.getElementById('input-released').value,
    runtime: document.getElementById('input-runtime').value,
    genre: document.getElementById('input-genre').value,
    director: document.getElementById('input-director').value,
    actors: document.getElementById('input-actors').value,
    poster: document.getElementById('input-poster').value,
    imdbRating: document.getElementById('input-imdbRating').value,
    imdbID: document.getElementById('input-imdbID').value
};

    fetch('http://localhost:8080/movies', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
},
    body: JSON.stringify(movie),
})
    .then(response => {
    if (response.ok) {
    return response.json();
} else {
    throw new Error('Error adding movie');
}
})
    .then(addedMovie => {
    alert('Movie added successfully');

    const moviesGrid = document.getElementById('moviesGrid');
    const movieItem = document.createElement('div');
    movieItem.classList.add('movie-item');

    movieItem.innerHTML = `
            <div class="poster">
                <a href="https://www.imdb.com/title/${addedMovie.imdbID}" target="_blank">
                    <img src="${addedMovie.poster}" alt="${addedMovie.title} Plakat">
                </a>
            </div>
            <div class="title">${addedMovie.title}</div>
        `;

    moviesGrid.appendChild(movieItem);

    document.getElementById('movie-form').reset();
    const modal = bootstrap.Modal.getInstance(document.getElementById('movie-modal'));
    modal.hide();
})
    .catch(error => console.error('Error:', error));
});


