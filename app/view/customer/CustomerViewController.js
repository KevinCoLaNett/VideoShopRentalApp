Ext.define('VideoShopRental.view.customer.CustomerViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.customerviewcontroller', // used to instantiate in CustomerView.js

    onAddCustomerClick: function () {
        var formWindow = Ext.create('Ext.window.Window', {
            title: 'Add Customer',
            layout: 'fit',
            width: 400,
            padding: 10,
            modal: true,
            resizable: false, // Disable window resizing
            //draggable: false, // Disable window movement
            items: [
                {
                    xtype: 'customerformview' // Reference the form component
                }
            ]
        });

        formWindow.show();
    }
});