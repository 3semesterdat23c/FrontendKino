// Funktion til at hente sæder for en bestemt showing
function loadSeatsForShowing(showingId) {
    fetch(`http://localhost:8080/showing/${showingId}/seats`)
        .then(response => response.json())
        .then(data => {
            renderSeats(data.bookedSeats, data.availableSeats);
        })
        .catch(error => {
            console.error("Error fetching seats: ", error);
        });
}

// Funktion til at rendere sæder baseret på status (booked/available)
function renderSeats(bookedSeats, availableSeats) {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Fjern tidligere sæder

    // Render booked (optaget) sæder
    bookedSeats.forEach(seat => {
        const seatElement = document.createElement('div');
        seatElement.classList.add('seat', 'occupied'); // Marker som optaget
        seatElement.dataset.seatId = seat.seatId;
        seatElement.innerText = `${seat.theatre.theatreId}-${seat.rowNumber}-${seat.seatNumber}`;
        container.appendChild(seatElement);
    });

    // Render available (ledig) sæder
    availableSeats.forEach(seat => {
        const seatElement = document.createElement('div');
        seatElement.classList.add('seat', 'available'); // Marker som ledig
        seatElement.dataset.seatId = seat.seatId;
        seatElement.innerText = `${seat.theatre.theatreId}-${seat.rowNumber}-${seat.seatNumber}`;

        // Gør sædet klikbart for at vælge det
        seatElement.addEventListener('click', () => selectSeat(seat.seatId));
        container.appendChild(seatElement);
    });
}

// Funktion til at håndtere valg af sæde
function selectSeat(seatId) {
    // Når et sæde vælges, markeres det visuelt og kan gemmes for videre behandling
    const selectedSeat = document.querySelector(`[data-seat-id="${seatId}"]`);

    if (selectedSeat.classList.contains('selected')) {
        // Hvis sædet allerede er valgt, fjern markeringen
        selectedSeat.classList.remove('selected');
    } else {
        // Marker sædet som valgt
        selectedSeat.classList.add('selected');
    }

    console.log('Selected seat ID: ' + seatId);
}

loadSeatsForShowing(1);
