Ext.define('VideoShopRental.view.movie.MovieViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.movieviewmodel',       // referenced in MainView.js

    requires: [
         'VideoShopRental.model.Movie'
    ],

    stores: {
        movies: {
            type: 'movie' // Reference the UserStore defined in store
        }
    }
});
