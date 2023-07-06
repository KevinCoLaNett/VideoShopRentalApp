Ext.define('VideoShopRental.view.customer.CustomerFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.customerformcontroller', // used to instantiate in CustomerFormView.js

    onSaveCustomerClick: function () {
       console.log('Saved');
    }
});