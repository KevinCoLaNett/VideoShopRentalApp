Ext.define('VideoShopRental.view.movie.MovieViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.movieviewmodel',       // referenced in MovieView.js

    requires: [
         'VideoShopRental.model.Movie'
    ],

    stores: {
        movies: {
            type: 'movie' // Reference the Movie defined in store
        }
    }
});
