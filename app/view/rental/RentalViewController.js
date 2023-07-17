Ext.define('VideoShopRental.view.rental.RentalViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.rentalviewcontroller',

    init: function () {
        var rentalStore = this.getViewModel().getStore('rentals');
        rentalStore.setAutoLoad(true);
    },

    onAddButtonClick: function () {
        var formType = 'add'; // Set the formType value here

        var formWindow = Ext.create('Ext.window.Window', {
            title: 'Rental Information',
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

    listOfRentedMovies: function (value, metaData, record) {
        var movies = [];
        Ext.each(value, function (detail) {
            if (detail.Movie && detail.Movie.Title) {
                movies.push(detail.Movie.Title);
            }
        });
        return movies.join(', ');
    }


});