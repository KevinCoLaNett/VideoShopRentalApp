Ext.define('VideoShopRental.view.movie.MovieViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.movieviewcontroller', // used to instantiate in MainView.js

    onAddButtonClick: function() {
        var formWindow = Ext.create('Ext.window.Window', {
            title: 'Add Movie',
            width: 400,
            height: 200,
            layout: 'fit',
            modal: true,
            items: [
                // Your form component(s) configuration
            ]
        });

        formWindow.show();
    }

   
});