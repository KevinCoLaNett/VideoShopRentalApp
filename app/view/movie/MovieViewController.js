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

    onDeleteMovieClick: function (button, rowIndex, colIndex, item, e, record) {
        var grid = button.up('grid'),
            store = grid.getStore(),
            movieId = record.get('MovieId');

        Ext.Msg.confirm('Delete Movie', 'Are you sure you want to delete this movie?', function (btn) {
            if (btn === 'yes') {

                store.remove(record);
                //console.log(store);
                Ext.Ajax.request({
                    url: 'https://localhost:44348/api/Movies/' + movieId,
                    method: 'DELETE',
                    success: function () {
                      Ext.Msg.alert('Delete Movie', 'Movie deleted successfully');
                    },
                    failure: function () {
                      Ext.Msg.alert('Delete Movie', 'Failed to delete movie');
                    }
                });
            }
        });
    }

    // onDeleteMovieClick: function (button, rowIndex, colIndex, item, e, record) {
    //     var grid = button.up('grid'),
    //         store = grid.getStore(),
    //         movieId = record.get('MovieId'); // Assuming 'MovieId' is the actual identifier

    //     Ext.Msg.confirm('Delete Movie', 'Are you sure you want to delete this movie?', function (btn) {
    //         if (btn === 'yes') {
    //             // Find the record with matching MovieId
    //             var recordToRemove = store.findRecord('MovieId', movieId);

    //             if (recordToRemove) {
    //                 // Remove the record from the store
    //                 store.remove(recordToRemove);
    //                 store.sync({
    //                     success: function () {
    //                         Ext.Msg.alert('Delete Movie', 'Movie deleted successfully');
    //                     },
    //                     failure: function () {
    //                         Ext.Msg.alert('Delete Movie', 'Failed to delete movie');
    //                     }
    //                 });
    //             } else {
    //                 Ext.Msg.alert('Delete Movie', 'Movie not found');
    //             }
    //         }
    //     });
    // }




    // onDeleteMovieClick: function (button) {
    //     var grid = button.up('grid'),
    //         store = grid.getStore(),
    //         selection = grid.getSelection();

    //     if (selection.length > 0) {
    //         Ext.Msg.confirm('Delete', 'Are you sure you want to delete this record?', function (btn) {
    //             if (btn === 'yes') {
    //                 store.remove(selection);
    //                 store.sync({
    //                     success: function () {
    //                         Ext.Msg.alert('Delete', 'Record deleted successfully');
    //                     },
    //                     failure: function () {
    //                         Ext.Msg.alert('Delete', 'Failed to delete record');
    //                     }
    //                 });
    //             }
    //         });
    //     }
    // }

});