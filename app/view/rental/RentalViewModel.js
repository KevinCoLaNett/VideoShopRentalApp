Ext.define('VideoShopRental.view.rental.RentalViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.rentalviewmodel',

    stores: {
        rentalStore: {
            type: 'rental',
            pageSize: 15,
            autoLoad: false
        }
    },

    // Function to load rentals based on completion status
    loadRentalsByType: function (isReturnedRentals) {
        var store = this.getStore('rentalStore');
        store.clearFilter();

        var params = {
            isCompleted: isReturnedRentals ? true : false
        };

        store.getProxy().setExtraParams(params);

        // Load the data with the updated filters
        store.load();
    }
});
