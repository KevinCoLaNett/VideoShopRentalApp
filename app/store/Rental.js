Ext.define('VideoShopRental.store.Rental', {
    extend: 'Ext.data.Store',

    alias: 'store.rental',

    model: 'VideoShopRental.model.Rental',

    autoLoad: true,
    
    // proxy: {
    //     type: 'rest',
    //     url: 'https://localhost:44348/api/Rentals',   // access to application data
    //     reader: {
    //         rootProperty: 'results'
    //     }
    // }

    proxy: {
        type: 'rest',
        url: 'https://localhost:44348', // Base URL of the RESTful API endpoint
        reader: {
          type: 'json',
          rootProperty: 'data'
        },
        writer: {
          type: 'json',
          writeAllFields: true
        },
        api: {
          create: '/api/Rentals',
          read: '/api/Rentals',
          update: '/api/Rentals',
          destroy: '/api/Rentals'
        }
      },
      autoLoad: true // Optional, automatically load data when the store is created
});
