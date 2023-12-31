Ext.define('VideoShopRental.model.Rental', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'RentalId', type: 'int' },
        { name: 'RentalDate', type: 'date', dateFormat: 'Y-m-d g:i A' },
        { name: 'ReturnDate', type: 'date', dateFormat: 'Y-m-d g:i A' },
        { name: 'TotalRentalFee', type: 'number' },
        { name: 'IsCompleted', type: 'boolean' },
        { name: 'CustomerId', type: 'int' },
        { name: 'Customer', reference: 'VideoShopRental.model.Customer' },
        { name: 'RentalDetails', reference: 'VideoShopRental.model.RentalDetail' }
    ],

    idProperty: 'RentalId',

    hasMany: [
        {
            model: 'VideoShopRental.model.RentalDetail',
            name: 'RentalDetails'
        }
    ]
});