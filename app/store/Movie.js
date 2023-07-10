Ext.define('VideoShopRental.store.Movie', {
  extend: 'Ext.data.Store',

  alias: 'store.movie',

  storeId: 'moviestore',

  model: 'VideoShopRental.model.Movie',

  proxy: {
    type: 'rest',
    //url: 'https://localhost:44348/api/Movies',
    reader: {
      type: 'json',
      rootProperty: 'data'
    },
    writer: {
      type: 'json',
      writeAllFields: true, // Include all fields by default
    },
    api: {
      create: 'https://localhost:44348/api/Movies',
      read: 'https://localhost:44348/api/Movies',
      update: 'https://localhost:44348/api/Movies',
      destroy: 'https://localhost:44348/api/Movies'
    }
  },

  autoLoad: true // Optional, automatically load data when the store is created
});
