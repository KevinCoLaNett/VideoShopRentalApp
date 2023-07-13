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

    setPageSizeToTotalCount: function (store, records, successful, operation) {
        if (successful) {
            var totalCount = store.getTotalCount();
            store.setPageSize(totalCount);
        }
    },

    onSaveRentalClick: function (button) {
        var form = button.up('form'),
            formType = this.formType,
            recordData = this.recordData,
            formValues = form.getValues(),
            rentalStore = Ext.getStore('rentalstore');

        console.log(formValues);

    },


});