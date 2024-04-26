const model = {
    movies: [],
};

const view = {
    displayMovies: function() {
        const movieList = document.getElementById('movieList');
        movieList.innerHTML = '';

        model.movies.forEach(function(movie, index) {
            const listItem = document.createElement('li');
            listItem.textContent = movie;
            
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remover';
            removeButton.addEventListener('click', function() {
                controller.removeMovie(index);
            });
            listItem.appendChild(removeButton);

            movieList.appendChild(listItem);
        });
    },
};


const controller = {
    init: function() {
        view.displayMovies();
    },

    addMovie: function(movie) {
        model.movies.push(movie);
        view.displayMovies();
    },

    removeMovie: function(index) {
        model.movies.splice(index, 1);
        view.displayMovies();
    },

    handleRemoveMovie: function(index) {
        controller.removeMovie(index);
    }
};

function addMovie(){
    const newMovieInput = document.getElementById('newMovie');
    const newMovie = newMovieInput.value.trim();
    if (newMovie !== '') {
        controller.addMovie(newMovie);
        newMovieInput.value = '';
    }
}

function removeMovie(index){
    controller.handleRemoveMovie(index);
}

