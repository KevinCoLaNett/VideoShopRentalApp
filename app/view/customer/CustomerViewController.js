Ext.define('VideoShopRental.view.customer.CustomerViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.customerviewcontroller', // used to instantiate in MainView.js

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