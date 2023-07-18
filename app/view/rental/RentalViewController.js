Ext.define('VideoShopRental.view.rental.RentalViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.rentalviewcontroller',

    init: function () {
        var rentalStore = this.getViewModel().getStore('rentals');
        rentalStore.setPageSize(15);
        rentalStore.setAutoLoad(true);
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
                var customer = record.get('Customer');
                return customer.Name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
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

    listOfRentedMovies: function (value, metaData, record) {
        var movies = [];
        Ext.each(value, function (detail) {
            if (detail.Movie && detail.Movie.Title) {
                movies.push(detail.Movie.Title);
            }
        });
        return movies.join(', ');
    },

    onAddButtonClick: function () {
        var formType = 'add'; // Set the formType value here

        var formWindow = Ext.create('Ext.window.Window', {
            title: 'Rental Information (Add New Rent)',
            layout: 'fit',
            modal: true,
            //resizable: false, // Disable window resizing
            //draggable: false, // Disable window movement
            items: [
                {
                    xtype: 'rentalformview', // Reference the form component
                    formType: formType
                }
            ]
        });

        formWindow.show();
    },

    onEditRentalClick: function (grid, rowIndex, colIndex, item, e, record) {
        var formType = 'update'; // Set the formType value here

        var formWindow = Ext.create('Ext.window.Window', {
            title: 'Rental Information (Update Rent)',
            layout: 'fit',
            modal: true,
            //resizable: false, // Disable window resizing
            //draggable: false, // Disable window movement
            items: [
                {
                    xtype: 'rentalformview', // Reference the form component
                    formType: formType, //pass the formType to the form
                    recordData: record.getData() // Pass the record data to the form
                }
            ]
        });

        formWindow.show();
    },

    onDeleteRentalClick: function (button, rowIndex, colIndex, item, e, record) {
        var grid = button.up('grid'),
            rentalStore = grid.getStore();


        Ext.Msg.confirm('Delete Rental', 'Are you sure you want to delete this Rental?', function (btn) {
            if (btn === 'yes') {
                if (record !== -1) {
                    //console.log(record);
                    rentalStore.remove(record);
                    rentalStore.sync({
                        success: function () {
                            Ext.Msg.alert('Delete Rental', 'Rental deleted successfully!');
                            rentalStore.reload();
                            var grid = Ext.ComponentQuery.query('movie')[0];
                            grid.getStore().reload();
                        },
                        failure: function () {
                            Ext.Msg.alert('Delete Rental', 'Failed to delete Rental!');
                        }
                    });
                } else {
                    Ext.Msg.alert('Delete Rental', 'Rental not found');
                }
            }
        });
    }


});