Ext.define('VideoShopRental.view.movie.MovieFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.movieformcontroller', // used to instantiate in CustomerFormView.js

    onSaveMovieClick: function () {
       console.log('Saved');
    }
});