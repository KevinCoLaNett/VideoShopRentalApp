Ext.define('VideoShopRental.view.customer.CustomerFormController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.customerformcontroller', // used to instantiate in CustomerFormView.js

    onSaveCustomerClick: function(button) {
        var form = button.up('form');
        var formValues = form.getValues();
      
        var store = Ext.getStore('customerstore');
        var newCustomer = Ext.create('VideoShopRental.model.Customer');
        newCustomer.set(formValues);
      
        //console.log(newCustomer);
        store.add(newCustomer);
      
        store.sync({
          success: function(response) {
            Ext.Msg.alert('Add Customer', 'Customer added successfully!');
            //var grid = button.up('customerGridId');
            //grid.getStore().load();
            form.reset();
          },
          failure: function(response) {
            store.remove(newCustomer);
            Ext.Msg.alert('Add Customer', 'Failed to add Customer!');
          }
        });
      }
});