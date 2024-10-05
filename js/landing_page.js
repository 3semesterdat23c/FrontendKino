
fetch('http://localhost:8080/getMovies')
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

    document.getElementById('btn-save-movie').addEventListener('click', function () {
        const movie = {
            title: document.getElementById('input-title').value,
            year: document.getElementById('input-year').value,
            released: document.getElementById('input-released').value,
            runtime: document.getElementById('input-runtime').value,
            genres: document.getElementById('input-genre').value.split(',').map(name => ({ genreName: name.trim() })).filter(g => g.genreName),
            directors: document.getElementById('input-director').value.split(',').map(name => ({ fullName: name.trim() })).filter(d => d.fullName),
            actors: document.getElementById('input-actors').value.split(',').map(name => ({ fullName: name.trim() })).filter(a => a.fullName),
            poster: document.getElementById('input-poster').value,
            imdbRating: document.getElementById('input-imdbRating').value,
            imdbID: document.getElementById('input-imdbID').value
        };

        // Log the movie object to debug
        console.log("Submitting movie:", movie);

        fetch('http://localhost:8080/movies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(movie),
        })
            .then(response => {
                if (!response.ok) {
                    return response.text().then(text => { throw new Error(text); });
                }
                return response.json();
            })
            .then(addedMovie => {
                alert('Movie added successfully');

                const moviesGrid = document.getElementById('moviesGrid');
                const movieItem = document.createElement('div');
                movieItem.classList.add('movie-item');

                movieItem.innerHTML = `
    <div class="poster">
        <a href="/movie-details.html?id=${addedMovie.movieId}">
            <img src="${addedMovie.poster}" alt="${addedMovie.title} Poster">
        </a>
    </div>
    <div class="title">${addedMovie.title}</div>
`;



                moviesGrid.appendChild(movieItem);

                // Reset the form
                document.getElementById('movie-form').reset();
                const modal = bootstrap.Modal.getInstance(document.getElementById('movie-modal'));
                modal.hide();
            })
            .catch(error => console.error('Error:', error));
    });



