Ext.define('VideoShopRental.view.customer.CustomerViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.customerviewmodel',       // referenced in MainView.js

    stores: {
        customers: {
            type: 'customer' // Reference the Customer defined in store
        }
    }
});
