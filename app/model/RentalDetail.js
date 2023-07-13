Ext.define('VideoShopRental.model.RentalDetail', {
    extend: 'Ext.data.Model',
    fields: [
        { name: 'RentalDetailId', type: 'int' },
        { name: 'MovieRentalFee', type: 'number' },
        { name: 'Quantity', type: 'int' },
        { name: 'RentalId', type: 'int' },
        { name: 'MovieId', type: 'int' },
        { name: 'Rental', reference: 'MyApp.model.Rental' },
        { name: 'Movie', reference: 'MyApp.model.Movie' }
    ],

    idProperty: 'RentalDetailId'
});
