/*
 * This file launches the application by asking Ext JS to create
 * and launch() the Application class.
 */
Ext.application({
    extend: 'VideoShopRental.Application',

    name: 'VideoShopRental',

    requires: [
        // This will automatically load all classes in the VideoShopRental namespace
        // so that application classes do not need to require each other.
        'VideoShopRental.*'
    ],

    // The name of the initial view to create.
    mainView: 'VideoShopRental.view.main.Main'
});
