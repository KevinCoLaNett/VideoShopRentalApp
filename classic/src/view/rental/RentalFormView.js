Ext.define('VideoShopRental.view.rental.RentalFormView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.rentalformview',
    formType: 'rental',

    controller: 'rentalformcontroller',

    requires: [
        'VideoShopRental.store.Customer' // Add the required store
    ],

    fieldDefaults: {
        labelAlign: "right",
        labelWidth: 115,
        msgTarget: 'side'
    },

    config: {
        formType: 'add', // Default form type is 'movie'
        recordData: null // Holds the record data for update form
    },

    items: [{
        xtype: 'fieldset',
        title: 'Rental Information',
        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },

        items: [
            {
                fieldLabel: 'Customer Name',
                name: 'customerId',
                emptyText: 'Select',
                xtype: 'combobox',
                allowBlank: false,
                store: {
                    type: 'customer' // Set the type to the customer store
                },
                displayField: 'Name',
                valueField: 'CustomerId',
                forceSelection: true
            },
            {
                fieldLabel: 'Movie Name(s)',
                name: 'movieIds',
                emptyText: 'Select',
                xtype: 'tagfield',
                allowBlank: false,
                store: {
                    type: 'movie', // Set the type to the movie store
                    autoLoad: true // Optionally auto load the movie store
                },
                displayField: 'Title',
                valueField: 'MovieId',
                forceSelection: true,
                filterPickList: true,
                multiSelect: true // Enable multiple selections
            },
            {
                fieldLabel: 'Quantity',
                name: 'quantity',
                xtype: 'numberfield',
                minValue: 1,
                value: 1,
                allowBlank: false
            },
            {
                fieldLabel: 'Rental Duration (in days)',
                name: 'rentalDuration',
                xtype: 'numberfield',
                minValue: 1,
                value: 1,
                allowBlank: false
            }
        ]
    }],

    buttons: [{
        text: 'Save',
        disabled: true,
        formBind: true,
        handler: 'onSaveRentalClick'
    }]

});