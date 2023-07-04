Ext.define('VideoShopRental.model.Movie', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'Title', type: 'string'},
        {name: 'Genre', type: 'string'},
        {name: 'ReleaseDate', type: 'date'},
        {name: 'RentalPrice', type: 'float'},
        {name: 'NumberInStock', type: 'int'},
        {name: 'NumberAvailable', type: 'int'}
    ]
});