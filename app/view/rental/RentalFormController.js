Ext.define('VideoShopRental.view.rental.RentalFormController', {
    extend: 'Ext.app.ViewController',
  
    alias: 'controller.rentalformcontroller', // used to instantiate in CustomerFormView.js
  
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
  
    onSaveRentalClick: function (button) {
      
  
    },

    
  });