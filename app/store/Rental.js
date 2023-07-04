Ext.define('VideoShopRental.store.Rental', {
    extend: 'Ext.data.Store',

    alias: 'store.rental',

    model: 'VideoShopRental.model.Rental',

    autoLoad: true,
    
    proxy: {
        type: 'rest',
        url: 'https://localhost:44348/api/Rentals',   // access to application data
        reader: {
            rootProperty: 'results'
        }
    }
});
