Ext.define('VideoShopRental.store.Movie', {
    extend: 'Ext.data.Store',

    alias: 'store.movie',

    model: 'VideoShopRental.model.Movie',

    autoLoad: true,
    
    proxy: {
        type: 'rest',
        url: 'https://localhost:44348/api/Movies',   // access to application data
        reader: {
            rootProperty: 'results'
        }
    }
});
