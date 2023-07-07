Ext.define('VideoShopRental.model.Rental', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'RentalId', type: 'int'},
        {name: 'RentalDate', type: 'date'},
        {name: 'DueDate', type: 'date'},
        {name: 'DateReturned', type: 'date'},
        {name: 'CustomerId', type: 'int'}
    ]
});