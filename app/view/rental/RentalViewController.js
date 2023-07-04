Ext.define('VideoShopRental.view.rental.RentalViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.rentalviewcontroller', // used to instantiate in MainView.js

    onAddButtonClick: function() {
        var formWindow = Ext.create('Ext.window.Window', {
            title: 'Add Customer',
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