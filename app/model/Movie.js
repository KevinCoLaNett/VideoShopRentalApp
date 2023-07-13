Ext.define('VideoShopRental.model.Movie', {
    extend: 'Ext.data.Model',

    fields: [
        { name: 'MovieId', type: 'int' },
        { name: 'Title', type: 'string' },
        { name: 'Genre', type: 'string' },
        { name: 'ReleaseDate', type: 'date', dateFormat: 'Y-m-d g:i A' },
        { name: 'RentalPrice', type: 'number', precision: 10, scale: 2 },
        { name: 'NumberInStock', type: 'int' },
        { name: 'NumberAvailable', type: 'int' }
    ],

    idProperty: 'MovieId',

    hasMany: [
        {
            model: 'VideoShopRental.model.RentalDetail',
            name: 'RentalDetails'
        }
    ]
});