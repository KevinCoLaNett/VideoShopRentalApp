Ext.define('VideoShopRental.view.rental.RentalFormView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.rentalformview',
    formType: 'rental',

    controller: 'rentalformcontroller',

    config: {
        formType: 'add', // Default form type is 'movie'
        recordData: null, // Holds the record data for update form
        movieStore: null
    },

    width: 600,
    bodyPadding: 10,
    defaults: {
        anchor: '100%',
        labelWidth: 120
    },

    items: [
        {
            fieldLabel: 'Customer Name',
            name: 'customerId',
            emptyText: 'Select',
            xtype: 'combobox',
            allowBlank: false,
            store: {
                type: 'customer',
                autoLoad: true,
                listeners: {
                    load: function (store, records, successful, operation) {
                        if (successful) {
                            var totalCount = store.getTotalCount();
                            store.setPageSize(totalCount);
                        }
                    }
                }
            },
            displayField: 'Name',
            valueField: 'CustomerId',
            forceSelection: true
        },
        {
            xtype: 'fieldset',
            title: 'Movie Details',
            collapsible: true,
            defaults: {
                labelWidth: 110,
                anchor: '100%',
                layout: 'hbox'
            },
            items: [
                {
                    xtype: 'tagfield',
                    fieldLabel: 'Movie Title(s)',
                    name: 'movieIds',
                    emptyText: 'Select',
                    allowBlank: false,
                    store: {
                        type: 'movie',
                        autoLoad: true,
                        listeners: {
                            load: function (store, records, successful, operation) {
                                if (successful) {
                                    var totalCount = store.getTotalCount();
                                    store.setPageSize(totalCount);
                                }
                            }
                        }
                    },
                    displayField: 'Title',
                    valueField: 'MovieId',
                    forceSelection: true,
                    filterPickList: true,
                    multiSelect: true,
                    tpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                    '<div class="x-boundlist-item">{Title} - ₱{RentalPrice} - Available: {NumberAvailable} </div>',
                    //'Movie: <span class="quantity">{[values.Title]}</span>, Available: <span class="available">{[values.NumberAvailable]}</span>, Rental Fee: <span class="rentalFee">₱{[values.RentalPrice]}</span>',
                    '</tpl>'
                    ),
                    listeners: {
                        change: 'onMovieSelectionChange'
                    }
                },
                {
                    xtype: 'container',
                    itemId: 'copyCountContainer',
                    layout: 'anchor',
                    defaults: {
                        xtype: 'numberfield',
                        minValue: 1,
                        value: 1
                    }
                },
                {
                    xtype: 'container',
                    itemId: 'rentalPrice',
                    layout: 'anchor'
                }
            ]
        },
        {
            xtype: 'textfield',
            fieldLabel: 'Total Rental Fee ₱ ',
            name: 'totalRentFee',
            readOnly: true
        }

    ],

    buttons: [{
        text: 'Add Rent',
        disabled: true,
        formBind: true,
        handler: 'onSaveRentalClick'
    }]
});
