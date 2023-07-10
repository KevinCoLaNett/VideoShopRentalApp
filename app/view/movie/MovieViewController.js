Ext.define('VideoShopRental.view.movie.MovieViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.movieviewcontroller', // used to instantiate in MainView.js

    onAddMovieClick: function () {
        var formWindow = Ext.create('Ext.window.Window', {
            title: 'Add Movie',
            layout: 'fit',
            width: 400,
            padding: 10,
            modal: true,
            resizable: false, // Disable window resizing
            //draggable: false, // Disable window movement
            items: [
                {
                    xtype: 'movieformview' // Reference the form component
                }
            ]
        });

        formWindow.show();
    },

    onEditMovieClick: function () {
        console.log('Edit This Movie');
    },

    // onDeleteMovieClick: function (button, rowIndex, colIndex, item, e, record) {
    //     var grid = button.up('grid'),
    //         store = grid.getStore(),
    //         movieId = record.get('MovieId');

    //     Ext.Msg.confirm('Delete Movie', 'Are you sure you want to delete this movie?', function (btn) {
    //         if (btn === 'yes') {

    //             store.remove(record);
    //             //console.log(store);
    //             Ext.Ajax.request({
    //                 url: 'https://localhost:44348/api/Movies/' + movieId,
    //                 method: 'DELETE',
    //                 success: function () {
    //                   Ext.Msg.alert('Delete Movie', 'Movie deleted successfully');
    //                 },
    //                 failure: function () {
    //                   Ext.Msg.alert('Delete Movie', 'Failed to delete movie');
    //                 }
    //             });
    //         }
    //     });
    // }

    onDeleteMovieClick: function (button, rowIndex, colIndex, item, e, record) {
        var grid = button.up('grid'),
            movieStore = grid.getStore();


        Ext.Msg.confirm('Delete Movie', 'Are you sure you want to delete this movie?', function (btn) {
            if (btn === 'yes') {
                if (record !== -1) {
                    //console.log(record);
                    movieStore.remove(record);
                    movieStore.sync({
                        success: function () {
                            Ext.Msg.alert('Delete Movie', 'Movie deleted successfully!');
                        },
                        failure: function () {
                            Ext.Msg.alert('Delete Movie', 'Failed to delete movie!');
                        }
                    });
                } else {
                    Ext.Msg.alert('Delete Movie', 'Movie not found');
                }
            }
        });
    }

});