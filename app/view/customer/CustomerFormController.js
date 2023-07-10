Ext.define('VideoShopRental.view.customer.CustomerFormController', {
  extend: 'Ext.app.ViewController',

  alias: 'controller.customerformcontroller', // used to instantiate in CustomerFormView.js

  config: {
    formType: 'add', // Default form type is 'add'
    recordData: null
  },

  setFormType: function (formType) {
    this.formType = formType;
  },

  loadRecordData: function (recordData) {
    this.recordData = recordData;
  },

  onSaveCustomerClick: function (button) {
    // Access the formType property
    var form = button.up('form'),
      formType = this.formType,
      recordData = this.recordData,
      formValues = form.getValues(),
      customerStore = Ext.getStore('customerstore');

    if (form && form.isValid()) {

      if (formType == 'add') {
        // Create a new record with the form values
        var newCustomer = Ext.create('VideoShopRental.model.Customer', formValues);

        // Add the new record to the store
        newCustomer.set('CustomerId', 0);
        customerStore.add(newCustomer);
        customerStore.sync({
          success: function (response) {
            Ext.Msg.alert('Add Customer', 'Customer added successfully!');
            customerStore.load();
            form.reset();
          },
          failure: function (response) {
            customerStore.remove(newCustomer);
            Ext.Msg.alert('Add Customer', 'Failed to add Customer!');
          }
        });
      }
      else if (formType == 'update') {
        // Find the existing record by the unique identifier
        var existingRecord = customerStore.findRecord('CustomerId', recordData.CustomerId);
        if (existingRecord) {
          // Update the record with the new form values
          existingRecord.set(formValues);
          customerStore.sync({
            success: function (response) {
              Ext.Msg.alert('Update Customer', 'Customer updated successfully!');
              customerStore.load();
            },
            failure: function (response) {
              Ext.Msg.alert('Update Customer', 'Failed to update Customer!');
            }
          });
        } else {
          console.log('Customer does not exist!');
        }
      } else {
        console.log('there is something wrong!');
      }
    }



    // onSaveCustomerClick: function (button) {
    //   var form = button.up('form');
    //   var formValues = form.getValues();

    //   var store = Ext.getStore('customerstore');
    //   var newCustomer = Ext.create('VideoShopRental.model.Customer');
    //   newCustomer.set(formValues);
    //   newCustomer.set('CustomerId', 0);

    //   //console.log(newCustomer);
    //   store.add(newCustomer);

    //   store.sync({
    //     success: function (response) {
    //       Ext.Msg.alert('Add Customer', 'Customer added successfully!');
    //       store.load();
    //       form.reset();
    //     },
    //     failure: function (response) {
    //       store.remove(newCustomer);
    //       Ext.Msg.alert('Add Customer', 'Failed to add Customer!');
    //     }
    //   });

  }
});