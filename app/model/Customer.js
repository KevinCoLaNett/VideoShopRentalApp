Ext.define('VideoShopRental.model.Customer', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'CustomerId', type: 'int'},
        {name: 'Name', type: 'string'},
        {name: 'Address', type: 'string'},
        {name: 'Email', type: 'string'},
        {name: 'ContactNumber', type: 'string'}
    ],

    idProperty: 'CustomerId',

    hasMany: [
        {
            model: 'VideoShopRental.model.Rental',
            name: 'Rentals'
        }
    ]
});