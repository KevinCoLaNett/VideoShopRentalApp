Ext.define('VideoShopRental.view.rental.RentalViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.rentalviewcontroller',

    init: function () {
        
    },

    updateAddButtonState: function () {
        var rentalView = this.getView(),
            rentalStore = rentalView.getStore(),
            customerStore = Ext.getStore('customerstore'),
            movieStore = Ext.getStore('moviestore'),
            addButton = rentalView.lookupReference('btnAddRental');

        customerStore.on('load', function () {
            var hasCustomers = customerStore.getCount() > 0;
            var hasMovies = movieStore.getCount() > 0;
            addButton.setDisabled(!hasCustomers || !hasMovies);
        });

        movieStore.on('load', function () {
            var hasCustomers = customerStore.getCount() > 0;
            var hasMovies = movieStore.getCount() > 0;
            addButton.setDisabled(!hasCustomers || !hasMovies);
        });
        rentalStore.reload();

    },

    // onSearchTextKeyUp: function (field, event) {
    //     if (event.getKey() === Ext.event.Event.ENTER) {
    //         var searchText = field.getValue();
    //         this.performSearch(searchText);
    //     }
    // },

    performSearch: function (textField) {
        var searchText = textField.getValue();
        var reference = textField.getReference();
        var grid = this.getView();
        var xtype = grid.xtype;

        // Get the store associated with the grid
        var store = grid.getStore();

        // Apply the search filter to the store
        store.clearFilter(); // Clear any previous filters
        if (xtype == 'rental') {
            grid.getStore().filter('IsCompleted', 'false');
        }
        else if (xtype == 'returnedrental') {
            grid.getStore().filter('IsCompleted', 'true');
        } else {
            console.log('there is something wrong');
        }

        if (searchText) {
            store.filterBy(function (record) {
                if (xtype === 'rental') {
                    var isCompleted = record.get('IsCompleted');
                    if (!isCompleted) {
                        var customer = record.get(reference);
                        if (customer && customer.Name) {
                            var customerName = customer.Name.toLowerCase();
                            var searchValue = searchText.toLowerCase();
                            console.log(customer);
                            return customerName.indexOf(searchValue) !== -1;
                        }
                        if (reference == 'Movie') {
                            var rentalDetails = record.get('RentalDetails');
                            rentalDetails.forEach((detail) => {
                                console.log(detail.Movie.Title);
                            })
                        }
                    }
                } else if (xtype === 'returnedrental') {
                    var isCompleted = record.get('IsCompleted');
                    if (isCompleted) {
                        var customer = record.get(reference);
                        if (customer && customer.Name) {
                            var customerName = customer.Name.toLowerCase();
                            var searchValue = searchText.toLowerCase();
                            return customerName.indexOf(searchValue) !== -1;
                        }
                    }
                } else {
                    console.log('There is something wrong');
                }

                return false;
            });
        }
    },

    onRefreshClick: function (button) {
        var grid = button.up('grid');

        //reload the grid
        //grid.getStore().clearFilter();
        grid.getStore().getSorters().clear();
        grid.getStore().reload();

        //set pageSize to default value = 15
        grid.getStore().setPageSize(15);
        grid.getStore().loadPage(1);

        //set itemsPerPageField to default value = 15
        var itemsPerPageField = this.lookupReference('itemsPerPageField');
        itemsPerPageField.setValue(15);

        //clear the searchfield
        var searchTextTitle = this.lookupReference('Customer');
        var searchTextGenre = this.lookupReference('Movie');
        searchTextTitle.setValue('');
        searchTextGenre.setValue('');
        //for specific grid
        var xtype = grid.xtype;
        if (xtype == 'rental') {
            grid.getStore().filter('IsCompleted', 'false');
        }
        else if (xtype == 'returnedrental') {
            grid.getStore().filter('IsCompleted', 'true');
        } else {
            console.log('there is something wrong');
        }
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

    listOfQuantity: function (value, metaData, record) {
        var quantitties = [];
        Ext.each(value, function (detail) {
            if (detail.Quantity) {
                quantitties.push(detail.Quantity);
            }
        });
        return quantitties.join(', ');
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
    },

    onReturnedRentalClick: function (button, rowIndex, colIndex, item, e, record) {
        //var rentalStore = Ext.getStore('rentalstore');
        var rentalViewModel = this.getViewModel();
        var rentalStore = rentalViewModel.getStore('rentalStore');

    
        var movieStore = Ext.getStore('moviestore');

        var existingRecord = rentalStore.findRecord('RentalId', record.data.RentalId);

        if (existingRecord) {
            var rentalDetails = existingRecord.get('RentalDetails');

            for (var i = 0; i < rentalDetails.length; i++) {
                var rentalDetail = rentalDetails[i];
                var movieId = rentalDetail.Movie.MovieId;
                var quantity = rentalDetail.Quantity;

                // Retrieve the movie record from the movieStore
                var movieRecord = movieStore.findRecord('MovieId', movieId);
                if (movieRecord) {
                    // Update the NumberAvailable property
                    movieRecord.set('NumberAvailable', movieRecord.get('NumberAvailable') + quantity);
                }
            }

            // Save the changes to the movie records
            movieStore.sync({
                success: function (batch, options) {
                    // Returned Rent Movie/s
                    existingRecord.set('IsCompleted', true);
                    existingRecord.set('ReturnDate', new Date());

                    // Save the modified existingRecord to the database
                    rentalStore.sync({
                        success: function (batch, options) {
                            Ext.Msg.alert('Update Rental', 'Rental Returned!');
                            rentalStore.reload();
                        },
                        failure: function (batch, options) {
                            Ext.Msg.alert('Update Rental', 'Failed to update Rental!');
                        }
                    });

                },
                failure: function (batch, options) {
                    Ext.Msg.alert('Update Rental', 'Failed to update movie records!');
                }
            });
        } else {
            console.log('Record not found');
            console.log(existingRecord);
        }
    },

});