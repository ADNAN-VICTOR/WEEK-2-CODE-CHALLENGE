//This ensures that the JavaScript code runs only after the DOM has been fully loaded.
$(document).ready(function() {
    let currentFilm; //  this variable stores the currently selected film

    // this function is used to fetch films data from the local server using an AJAX request
    function fetchFilmsData() {
        $.ajax({
            url: 'http://localhost:3000/films',
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                //calls the displayFilmTitles function to display the titles
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
        filmsList.empty(); // Clears the previous film titles

        // it Loops through each film 
        films.forEach(function(film) {
            // displays film titles as clickable links.
            let filmLink = $('<a>').addClass('film item').attr('href', '#').text(film.title);
            filmLink.click(function() {
                //When a film link is clicked, it sets the currentFilm variable 
                //and calls the updateFilmDetails function to display the details of the selected film.
                currentFilm = film;
                updateFilmDetails();
            });
                //it then appends the change
            filmsList.append(filmLink);
        });
    }

    // This function updates the film details section
    //with information about the currently selected film after it has been clicked.
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

   //function is called when the document is ready to fetch the film data 
   //and populate the page with film titles.
    fetchFilmsData();
});
