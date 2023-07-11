Ext.define('VideoShopRental.store.Customer', {
  extend: 'Ext.data.Store',

  alias: 'store.customer',

  storeId: 'customerstore',

  model: 'VideoShopRental.model.Customer',

  pageSize: 10,

  proxy: {
    type: 'rest',
    //url: 'https://localhost:44348', // Base URL of the RESTful API endpoint
    reader: {
      type: 'json',
      rootProperty: 'Customers',
      totalProperty: 'TotalCount'
    },
    writer: {
      type: 'json',
      writeAllFields: true
    },
    api: {
      create: 'https://localhost:44348/api/Customers',
      read: 'https://localhost:44348/api/Customers',
      update: 'https://localhost:44348/api/Customers',
      destroy: 'https://localhost:44348/api/Customers'
    }
  },
  autoLoad: false
});
