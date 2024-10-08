// Track selected seats
const selectedSeats = new Set();

// Function to fetch seat layout from backend for a specific showing and theater
function fetchSeatLayout(showingId, theaterId) {
    fetch(`/showing/${showingId}/seats?theaterId=${theaterId}`)
        .then(response => response.json())
        .then(data => {
            generateSeats(data); // Generate the seat layout dynamically based on fetched data
        })
        .catch(error => console.error('Error fetching seat data:', error));
}

// Function to dynamically generate seat layout from backend data
function generateSeats(seatData) {
    const seatContainer = document.getElementById('seatContainer');
    seatContainer.innerHTML = ''; // Clear previous seats

    seatData.forEach(seat => {
        const row = document.querySelector(`.row[data-row="${seat.rowNumber}"]`) || createRow(seat.rowNumber);
        const seatElement = document.createElement('div');
        seatElement.classList.add('seat');
        seatElement.setAttribute('data-seat-id', seat.seatId);

        // Set seat status based on backend data (either 'available' or 'occupied')
        if (seat.status === 'OCCUPIED') {
            seatElement.classList.add('occupied');
        } else if (seat.status === 'AVAILABLE') {
            seatElement.classList.add('available');
        }

        row.appendChild(seatElement);

        // Add click event to select available seats
        seatElement.addEventListener('click', () => {
            if (!seatElement.classList.contains('occupied')) {
                seatElement.classList.toggle('selected');
                if (seatElement.classList.contains('selected')) {
                    selectedSeats.add(seat.seatId); // Add seat to selected seats
                } else {
                    selectedSeats.delete(seat.seatId); // Remove seat from selected seats
                }
            }
        });

        seatContainer.appendChild(row);
    });
}

// Function to create a row if it doesn't exist
function createRow(rowNumber) {
    const row = document.createElement('div');
    row.classList.add('row');
    row.setAttribute('data-row', rowNumber);
    return row;
}

// Function to save selected seats as a booking
function saveBooking(email, showingId) {
    const selectedSeatsArray = Array.from(selectedSeats);

    const bookingData = {
        showingId: showingId,
        email: email,
        seatIds: selectedSeatsArray
    };

    fetch('/showing/booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData)
    })

        .then(response => response.json())
        .then(data => {
            alert('Booking gemt!');
            console.log('Booking saved:', data);
        })
        .catch(error => console.error('Error saving booking:', error));
}

// Fetch seat layout when the page loads or when a user selects a specific showing
fetchSeatLayout(1, 1); // Pass the actual showingId and theaterId dynamically

// Example call to save the booking (trigger this when user submits the form)
document.getElementById('saveBookingBtn').addEventListener('click', function() {
    const email = document.getElementById('email').value; // Get email from input field
    const showingId = 1; // This should come dynamically, depending on the user’s selection
    saveBooking(email, showingId);
});
