Ext.define('VideoShopRental.store.Customer', {
    extend: 'Ext.data.Store',

    alias: 'store.customer',

    model: 'VideoShopRental.model.Customer',

    // proxy: {
    //     type: 'rest',
    //     url: 'https://localhost:44348/api/Customers',   // access to application data
    //     reader: {
    //         rootProperty: 'results'
    //     }
    // }

    proxy: {
        type: 'rest',
        url: 'https://localhost:44348/api/Customers', // Base URL of the RESTful API endpoint
        reader: {
          type: 'json',
          rootProperty: 'data'
        },
        writer: {
          type: 'json',
          writeAllFields: true
        },
        api: {
          create: '/api/Customers',
          read: '/api/Customers',
          update: '/api/Customers',
          destroy: '/api/Customers'
        }
      },
      autoLoad: true // Optional, automatically load data when the store is created
});
