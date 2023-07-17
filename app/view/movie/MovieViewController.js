Ext.define('VideoShopRental.view.movie.MovieViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.movieviewcontroller', // used to instantiate in MainView.js

    init: function () {
        var movieStore = this.getViewModel().getStore('movies');
        movieStore.setPageSize(15);
        movieStore.setAutoLoad(true);
    },

    onSearchTextKeyUp: function (field, event) {
        if (event.getKey() === Ext.event.Event.ENTER) {
            var searchText = field.getValue();
            this.performSearch(searchText);
        }
    },

    performSearch: function () {
        var searchText = this.lookupReference('searchText').getValue();
        var grid = this.getView();

        // Get the store associated with the grid
        var store = grid.getStore();

        // Apply the search filter to the store
        store.clearFilter(); // Clear any previous filters
        if (searchText) {
            store.filterBy(function (record) {
                // Modify this condition to match your search logic
                var title = record.get('Title');
                return title.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            });
        }
    },

    onRefreshClick: function (button) {
        var grid = button.up('grid');
        //reload the grid
        grid.getStore().clearFilter();
        grid.getStore().getSorters().clear();
        grid.getStore().reload();

        //set pageSize to default value = 15
        grid.getStore().setPageSize(15);
        grid.getStore().loadPage(1);

        //set itemsPerPageField to default value = 15
        var itemsPerPageField = this.lookupReference('itemsPerPageField');
        itemsPerPageField.setValue(15);

        //clear the searchfield
        var searchText = this.lookupReference('searchText');
        searchText.setValue('');
    },

    onItemsPerPageChange: function (field, newValue) {
        var store = this.getView().getStore();
        store.setPageSize(newValue);
        store.loadPage(1);
    },

    onAddMovieClick: function () {
        var formType = 'add'; // Set the formType value here

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