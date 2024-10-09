// Function to load all seats for a specific showing
function loadSeatsForShowing(showingId) {
    // Fetch the seats data, including seatRows and seatsPerRow
    fetch(`http://localhost:8080/showing/${showingId}/seats`)
        .then(response => response.json())
        .then(data => {
            const { bookedSeats, allSeats, seatRows, seatsPerRow } = data;  // Destructure the data
            renderSeats(allSeats, bookedSeats, seatRows, seatsPerRow);      // Pass seatRows and seatsPerRow to the render function
        })
        .catch(error => {
            console.error("Error fetching seats: ", error);
        });
}

// Function to check if a seat is booked
function isSeatBooked(seat, bookedSeats) {
    return bookedSeats.some(bookedSeat => bookedSeat.seatId === seat.seatId);
}

// Function to render all seats based on theater layout and mark occupied ones
function renderSeats(allSeats, bookedSeats, seatRows, seatsPerRow) {
    const container = document.querySelector('.container');
    container.innerHTML = ''; // Clear previous seats

    let rowElement = document.createElement('div');
    rowElement.classList.add('row');

    // Loop over all rows and seats per row
    for (let rowIndex = 1; rowIndex <= seatRows; rowIndex++) {
        rowElement = document.createElement('div');
        rowElement.classList.add('row');  // Create a new row for each rowIndex

        for (let seatIndex = 1; seatIndex <= seatsPerRow; seatIndex++) {
            const seat = allSeats.find(seat => seat.rowNumber === rowIndex && seat.seatNumber === seatIndex);

            const seatElement = document.createElement('div');
            seatElement.classList.add('seat');  // Set default seat class
            seatElement.dataset.seatId = seat.seatId;

            // Set the text to display row and seat number
            seatElement.innerText = `${seat.rowNumber}-${seat.seatNumber}`;

            // Check if the seat is in the bookedSeats list
            if (isSeatBooked(seat, bookedSeats)) {
                seatElement.classList.add('occupied');  // Mark it as occupied
                seatElement.style.pointerEvents = 'none';  // Make it unclickable
            } else {
                seatElement.classList.add('available');  // Mark as available (clickable)
                seatElement.addEventListener('click', () => selectSeat(seat.seatId)); // Add click event for available seats
            }

            rowElement.appendChild(seatElement);
        }
        container.appendChild(rowElement);  // Append the row to the container after completing all seats in the row
    }
}

// Function to handle seat selection
function selectSeat(seatId) {
    const selectedSeat = document.querySelector(`[data-seat-id="${seatId}"]`);

    // Toggle selection
    if (selectedSeat.classList.contains('selected')) {
        selectedSeat.classList.remove('selected');  // Unselect if already selected
    } else {
        selectedSeat.classList.add('selected');  // Mark as selected
    }

    console.log('Selected seat ID: ' + seatId);
}

// Load seats for the initial showing (example: showingId = 1)
loadSeatsForShowing(1);
