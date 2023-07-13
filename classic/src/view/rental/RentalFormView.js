Ext.define('VideoShopRental.view.rental.RentalFormView', {
    extend: 'Ext.form.Panel',
    alias: 'widget.rentalformview',
    formType: 'rental',

    controller: 'rentalformcontroller',

    fieldDefaults: {
        labelAlign: "right",
        labelWidth: 115,
        msgTarget: 'side'
    },

    config: {
        formType: 'add', // Default form type is 'movie'
        recordData: null, // Holds the record data for update form
        movieStore: null
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
                fieldLabel: 'Movie Name(s)',
                name: 'movieIds',
                emptyText: 'Select',
                xtype: 'tagfield',
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
                }
                ,
                displayField: 'Title',
                valueField: 'MovieId',
                forceSelection: true,
                filterPickList: true,
                multiSelect: true,
                tpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                    '<div class="x-boundlist-item">{Title} - ₱{RentalPrice}</div>',
                    '</tpl>'
                ),
                displayTpl: Ext.create('Ext.XTemplate',
                    '<tpl for=".">',
                    '{Title} - ₱{RentalPrice}',
                    '</tpl>'
                )
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
    }],

    init: function () {
        console.log('asdsad');
    }

});