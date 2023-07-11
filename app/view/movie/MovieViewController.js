Ext.define('VideoShopRental.view.movie.MovieViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.movieviewcontroller', // used to instantiate in MainView.js

    seachHandler: function(btn){
        var searchText = this.lookupReference('searchText');
        alert(searchText.getValue());
    },
    onSearchTextHandler: function(obj, e, oPts){
        if(e.getKey() == e.ENTER){
            var searchButton = Ext.getCmp('movieGrid').lookupReference('searchButton');
            searchButton.click();
        }
    },

    onAddMovieClick: function () {
        var formType = 'add'; // Set the formType value here

        // Create an instance of the MovieFormView component with the formType config option
        var movieForm = Ext.create('VideoShopRental.view.movie.MovieFormView', {
            formType: formType
        });

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
                    xtype: 'movieformview', // Reference the form component
                    formType: formType
                }
            ]
        });

        formWindow.show();
    },

    onEditMovieClick: function (grid, rowIndex, colIndex, item, e, record) {
        var formType = 'update'; // Set the formType value here

        // Create an instance of the MovieFormView component with the formType config option
        var movieForm = Ext.create('VideoShopRental.view.movie.MovieFormView', {
            formType: formType
        });

        var formWindow = Ext.create('Ext.window.Window', {
            title: 'Update Movie',
            layout: 'fit',
            width: 400,
            padding: 10,
            modal: true,
            resizable: false, // Disable window resizing
            //draggable: false, // Disable window movement
            items: [
                {
                    xtype: 'movieformview', // Reference the form component
                    formType: formType, //pass the formType to the form
                    recordData: record.getData() // Pass the record data to the form
                }
            ]
        });

        formWindow.show();
    },

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
                            movieStore.load();
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