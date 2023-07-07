Ext.define('VideoShopRental.view.movie.MovieFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.movieformcontroller', // used to instantiate in CustomerFormView.js

    onSaveMovieClick: function(button) {
        var form = button.up('form');
        var formValues = form.getValues();
      
        var store = Ext.getStore('moviestore');
        var newMovie = Ext.create('VideoShopRental.model.Movie');
        newMovie.set(formValues);
      
        store.add(newMovie);
        //console.log(newMovie);
      
        store.sync({
          success: function(response) {
            Ext.Msg.alert('Add Movie', 'Movie added successfully!');
            //var grid = button.up('movie');
            //grid.getStore().load();
            form.reset();
          },
          failure: function(response) {
            store.remove(newMovie);
            Ext.Msg.alert('Add Movie', 'Failed to add Movie!');
          }
        });
      }
});