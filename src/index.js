$(document).ready(function() {
    let currentFilm; // Variable to store the currently selected film

    // Function to fetch films data from the local server
    function fetchFilmsData() {
        $.ajax({
            url: 'http://localhost:3000/films',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                displayFilmTitles(data);
            },
            error: function(error) {
                console.error('Error fetching data: ', error);
            }
        });
    }

    // Function to display film titles
    function displayFilmTitles(films) {
        let filmsList = $('#films');
        filmsList.empty(); // Clear previous film titles

        // Loop through each film and append title as an anchor tag to filmsList
        films.forEach(function(film) {
            let filmLink = $('<a>').addClass('film item').attr('href', '#').text(film.title);
            filmLink.click(function() {
                currentFilm = film;
                updateFilmDetails();
            });
            filmsList.append(filmLink);
        });
    }

    // Function to update film details when a film is selected
    function updateFilmDetails() {
        $('#title').text(currentFilm.title);
        $('.meta').text(currentFilm.runtime + ' minutes');
        $('#film-info').text(currentFilm.description);
        $('.ui.label').text(currentFilm.showtime);
        $('#ticket-num').text(currentFilm.capacity - currentFilm.tickets_sold);
        $('#poster').attr('src', currentFilm.poster);
    }

    // Buy Ticket event handler
    $('#buy-ticket').click(function() {
        if (currentFilm) {
            if (currentFilm.tickets_sold < currentFilm.capacity) {
                currentFilm.tickets_sold++;
                $('#ticket-num').text(currentFilm.capacity - currentFilm.tickets_sold);
            } else {
                alert('Sorry, this showing is sold out.');
            }
        } else {
            alert('Please select a movie first.');
        }
    });

    // Fetch films data when the document is ready
    fetchFilmsData();
});
