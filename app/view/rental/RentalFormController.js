Ext.define('VideoShopRental.view.rental.RentalFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.rentalformcontroller', // used to instantiate in CustomerFormView.js

    config: {
        formType: 'add', // Default form type is 'add'
        recordData: null
    },

    onStoreLoad: function (store, records, successful, operation) {
        if (successful) {
            var totalCount = store.getTotalCount();
            store.setPageSize(totalCount);
        }
    },

    setFormType: function (formType) {
        this.formType = formType;
    },

    loadRecordData: function (recordData) {
        this.recordData = recordData;
    },

    onSaveRentalClick: function (button) {
        var form = button.up('form'),
            formType = this.formType,
            recordData = this.recordData,
            formValues = form.getValues(),
            rentalStore = Ext.getStore('rentalstore');

        var formController = this;
        var view = formController.getView(); // Get the view instance

        if (form && form.isValid()) {
            //ADD NEW RENT
            if (formType == 'add') {
                // Create a new instance of the Rental model with the desired data
                var newRental = Ext.create('VideoShopRental.model.Rental', {
                    RentalDate: new Date(),
                    ReturnDate: Ext.Date.add(new Date(), Ext.Date.DAY, 5), // Add 5 days to the current date
                    TotalRentalFee: formValues.totalRentFee,
                    CustomerId: formValues.customerId,
                    IsCompleted: false,
                    RentalDetails: []
                });

                // Iterate over the movieIds from formValues and add rental details to the RentalDetails array
                for (var i = 0; i < formValues.movieIds.length; i++) {
                    var movieId = formValues.movieIds[i];
                    var copyCount = formValues['copyCount-' + movieId];
                    var movieRentalFee = formValues['rentalPrice-' + movieId] * copyCount;

                    var rentalDetail = {
                        MovieId: movieId,
                        MovieRentalFee: movieRentalFee, // Replace with the desired movie rental fee
                        Quantity: copyCount
                    };

                    newRental.get('RentalDetails').push(rentalDetail);
                }

                // Add the new record to the store
                newRental.set('RentalId', 0);
                //console.log(newRental);
                rentalStore.add(newRental);

                // Sync the store with the server
                rentalStore.sync({
                    success: function (response) {
                        Ext.Msg.alert('Add Rental', 'Rental added successfully!');
                        var grid = Ext.ComponentQuery.query('rental')[0];
                        grid.getStore().reload();
                        var moviegrid = Ext.ComponentQuery.query('movie')[0];
                        moviegrid.getStore().reload();

                        form.reset();
                        // Close the window/modal
                        var window = view.up('window');
                        window.close();
                    },
                    failure: function (response) {
                        movieStore.remove(newRental);
                        Ext.Msg.alert('Add Rental', 'Failed to add Rental!');
                    }
                });
            }
            else if (formType == 'update') {
                //UPDATE RENT
                // Find the existing record by the unique identifier
                var existingRecord = rentalStore.findRecord('RentalId', recordData.RentalId);
                if (existingRecord) {
                    // Update the record with the new form values
                    //console.log(formValues);
                    //console.log(recordData);
                    console.log(existingRecord);

                    // Set the individual properties of the existing record
                    existingRecord.set('RentalDate', recordData.RentalDate);
                    existingRecord.set('ReturnDate', recordData.ReturnDate);
                    existingRecord.set('TotalRentalFee', formValues.totalRentFee);
                    existingRecord.set('CustomerId', formValues.customerId);


                    // Clear the existing rental details
                    existingRecord.set('RentalDetails', []);

                    // Iterate over the movieIds from formValues and add rental details to the RentalDetails association
                    for (var i = 0; i < formValues.movieIds.length; i++) {
                        var movieId = formValues.movieIds[i];
                        var copyCount = formValues['copyCount-' + movieId];
                        var movieRentalFee = formValues['rentalPrice-' + movieId] * copyCount;

                        var rentalDetail = {
                            MovieId: movieId,
                            MovieRentalFee: movieRentalFee,
                            Quantity: copyCount
                        };

                        existingRecord.get('RentalDetails').push(rentalDetail);
                    }

                    rentalStore.sync({
                        success: function (batch, options) {
                            Ext.Msg.alert('Update Rental', 'Rental updated successfully!');
                            var grid = Ext.ComponentQuery.query('rental')[0];
                            grid.getStore().reload();
                            var moviegrid = Ext.ComponentQuery.query('movie')[0];
                            moviegrid.getStore().reload();

                            // Close the window/modal
                            var window = view.up('window');
                            window.close();
                        },
                        failure: function (batch, options) {
                            Ext.Msg.alert('Update Rental', 'Failed to update Rental!');
                        }
                    });
                } else {
                    console.log('Rental does not exist!');
                }
            } else {
                console.log('there is something wrong!');
            }

        }

    },

    onMovieSelectionChange: function (tagfield, newValue) {
        var formPanel = tagfield.up('form'),
            copyCountContainer = formPanel.down('#copyCountContainer'),
            totalRentFeeField = formPanel.down('textfield[name="totalRentFee"]');

        copyCountContainer.removeAll();
        totalRentFeeField.setValue('');

        if (newValue && newValue.length > 0) {
            var totalRentFee = 0;

            Ext.Array.each(newValue, function (movieId) {
                var movieRecord = tagfield.getStore().getById(movieId);
                if (movieRecord) {
                    var rentalPrice = movieRecord.get('RentalPrice');
                    var numberAvailable = movieRecord.get('NumberAvailable');
                    var movieTitle = movieRecord.get('Title');

                    var quantityField = {
                        xtype: 'container',
                        layout: {
                            type: 'hbox',
                            align: 'middle'
                        },
                        items: [{
                            xtype: 'numberfield',
                            fieldLabel: 'Quantity (' + movieTitle + ') :',
                            name: 'copyCount-' + movieId,
                            minValue: 1,
                            maxValue: numberAvailable,
                            value: 1,
                            flex: 1,
                            listeners: {
                                change: 'onCopyCountChange'
                            }
                        }, {
                            xtype: 'displayfield',
                            margin: '0 5 0 10',
                            value: 'Available: ' + numberAvailable
                        }, {
                            xtype: 'displayfield',
                            margin: '0 0 0 10',
                            value: 'Rental Price: ₱' + rentalPrice
                        },
                        {
                            xtype: 'hiddenfield',
                            name: 'numberAvailable-' + movieId,
                            value: numberAvailable
                        }, {
                            xtype: 'hiddenfield',
                            name: 'rentalPrice-' + movieId,
                            value: rentalPrice
                        }]
                    };

                    copyCountContainer.add(quantityField);
                    totalRentFee += rentalPrice;
                }
            });

            totalRentFeeField.setValue(totalRentFee.toFixed(2));
        }
    },

    onCopyCountChange: function (numberfield) {
        var formPanel = numberfield.up('form'),
            totalRentFeeField = formPanel.down('textfield[name="totalRentFee"]'),
            totalRentFee = 0;

        formPanel.query('numberfield[name^="copyCount-"]').forEach(function (quantityField) {
            var movieId = quantityField.getName().substring(10),
                movieRecord = quantityField.up('form').down('tagfield[name="movieIds"]').getStore().getById(movieId),
                rentalPrice = movieRecord.get('RentalPrice'),
                quantity = quantityField.getValue();

            totalRentFee += rentalPrice * quantity;
        });

        totalRentFeeField.setValue(totalRentFee.toFixed(2));
    }




});