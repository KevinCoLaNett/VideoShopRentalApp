Ext.define('VideoShopRental.store.Rental', {
  extend: 'Ext.data.Store',

  alias: 'store.rental',

  storeId: 'rentalstore',

  model: 'VideoShopRental.model.Rental',

  //pageSize: 15,

  proxy: {
    type: 'rest',
    reader: {
      type: 'json',
      rootProperty: 'Rentals',
      totalProperty: 'TotalCount'
    },
    writer: {
      type: 'json',
      writeAllFields: true, // Include all fields by default
    },
    api: {
      create: 'https://localhost:44348/api/Rentals',
      read: 'https://localhost:44348/api/RentalsWithCustomersAndDetails',
      update: 'https://localhost:44348/api/Rentals',
      destroy: 'https://localhost:44348/api/Rentals'
    }
  },

  autoLoad: false
});
