Ext.define('VideoShopRental.store.Movie', {
  extend: 'Ext.data.Store',

  alias: 'store.movie',

  model: 'VideoShopRental.model.Movie',

  // proxy: {
  //     type: 'rest',
  //     url: 'https://localhost:44348/api/Movies',   // access to application data
  //     reader: {
  //         rootProperty: 'results'
  //     }
  // },

  proxy: {
    type: 'rest',
    url: 'https://localhost:44348/api/Movies',
    reader: {
      type: 'json',
      rootProperty: 'data'
    },
    writer: {
      type: 'json',
      writeAllFields: true
    },
    api: {
      create: '/api/Movies',
      read: '/api/Movies',
      update: '/api/Movies',
      destroy: '/api/Movies'
    }
  },

  autoLoad: true // Optional, automatically load data when the store is created
});
