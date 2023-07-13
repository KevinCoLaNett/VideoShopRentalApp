Ext.define('VideoShopRental.view.rental.RentalViewModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.rentalviewmodel',       // referenced in MainView.js

    stores: {
        rentals: {
            type: 'rental'// Reference the Movie defined in store
        }
    }
});
