Ext.define('VideoShopRental.store.Customer', {
    extend: 'Ext.data.Store',

    alias: 'store.customer',

    model: 'VideoShopRental.model.Customer',

    autoLoad: true,
    
    proxy: {
        type: 'rest',
        url: 'https://localhost:44348/api/Customers',   // access to application data
        reader: {
            rootProperty: 'results'
        }
    }
});
