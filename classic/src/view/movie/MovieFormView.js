Ext.define('VideoShopRental.view.movie.MovieFormView', {
    extend: 'Ext.form.Panel',
    xtype: 'movieformview',

    controller: 'movieformcontroller',

    fieldDefaults: {
        labelAlign: "right",
        labelWidth: 115,
        msgTarget: 'side'
    },

    items: [{
        xtype: 'fieldset',
        title: 'Movie Information',

        defaultType: 'textfield',
        defaults: {
            anchor: '100%'
        },

        items: [{
            fieldLabel: 'Title',
            emptyText: 'Title',
            name: 'Title',
            allowBlank: false
        }, {
            fieldLabel: 'Genre',
            emptyText: 'Genre',
            name: 'Genre',
            itemId: 'nameField',
            allowBlank: false
        }, {
            xtype: 'datefield',
            format: 'Y-m-d g:i A',
            fieldLabel: 'Release Date',
            name: 'ReleaseDate',
            allowBlank: false,
            maxValue: new Date()
        },
        {
            fieldLabel: 'Rental Price',
            emptyText: '999.99',
            name: 'RentalPrice',
            itemId: 'rentalPriceField',
            allowBlank: false
        },
        {
            fieldLabel: 'Number in Stock',
            emptyText: '10',
            name: 'NumberInStock',
            itemId: 'numberInStockField',
            allowBlank: false
        },
        {
            fieldLabel: 'Number Available',
            emptyText: '10',
            name: 'NumberAvailable',
            itemId: 'numberAvailableField',
            allowBlank: false
        }
        ]
    }],

    buttons: [{
        text: 'Save',
        disabled: true,
        formBind: true,
        handler: 'onSaveMovieClick'
    }],

    initComponent: function () {
        this.callParent(arguments);

        // Custom vtypes for validation
        Ext.apply(Ext.form.field.VTypes, {
            customName: function (value) {
                // Implement your custom name validation logic here
                // Return true if valid, false otherwise
                return /^[A-Za-z\s]+$/.test(value);
            },
            customNameText: 'Invalid name. Please enter a valid name containing only letters and spaces.',

            customRentalPrice: function (value) {
                // Implement your custom rental price validation logic here
                // Return true if valid, false otherwise
                // Example: Validate if the value is a positive number with up to two decimal places
                return /^\d+(\.\d{1,2})?$/.test(value);
            },
            customRentalPriceText: 'Invalid rental price. Please enter a valid positive number up to two decimal places.',

            customAvailableQuantity: function (value) {
                // Implement your custom available quantity validation logic here
                // Return true if valid, false otherwise
                // Example: Validate if the value is a positive integer
                return /^[1-9]\d*$/.test(value);
            },
            customAvailableQuantityText: 'Invalid available quantity. Please enter a valid positive integer.'

        });

        // Genre
        var nameField = this.down('#nameField');
        nameField.vtype = 'customName';
        nameField.vtypeText = 'Invalid name. Please enter a valid name containing only letters and spaces.';

        // Rental Price
        var rentalPriceField = this.down('#rentalPriceField');
        rentalPriceField.vtype = 'customRentalPrice';
        rentalPriceField.vtypeText = 'Invalid rental price. Please enter a valid positive number up to two decimal places.';

        // Number in Stock
        var stockNumberField = this.down('#numberInStockField');
        stockNumberField.vtype = 'customAvailableQuantity';
        stockNumberField.vtypeText = 'Invalid available quantity. Please enter a valid positive integer.';

        //NumberAvailable
        var availableQuantityField = this.down('#numberAvailableField');
        availableQuantityField.vtype = 'customAvailableQuantity';
        availableQuantityField.vtypeText = 'Invalid available quantity. Please enter a valid positive integer.';

    }

});