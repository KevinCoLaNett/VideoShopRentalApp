/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('VideoShopRental.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',

    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',

        'VideoShopRental.view.main.MainController',
        'VideoShopRental.view.main.MainModel',

        'VideoShopRental.view.movie.MovieView',
        'VideoShopRental.view.customer.CustomerView',
        'VideoShopRental.view.rental.RentalView'
    ],

    controller: 'main',
    viewModel: 'main',

    ui: 'navigation',

    tabBarHeaderPosition: 1,
    titleRotation: 0,
    tabRotation: 0,

    header: {
        layout: {
            align: 'stretchmax'
        },
        title: {
            bind: {
                text: '{name}'
            },
            flex: 0
        },
        iconCls: 'fa-th-list'
    },

    tabBar: {
        flex: 1,
        layout: {
            align: 'stretch',
            overflowHandler: 'none'
        }
    },

    responsiveConfig: {
        tall: {
            headerPosition: 'top'
        },
        wide: {
            headerPosition: 'left'
        }
    },

    defaults: {
        bodyPadding: 10,
        tabConfig: {
            responsiveConfig: {
                wide: {
                    iconAlign: 'left',
                    textAlign: 'left'
                },
                tall: {
                    iconAlign: 'top',
                    textAlign: 'center',
                    width: 120
                }
            }
        }
    },

    items: [{
        title: 'Rentals',
        iconCls: 'fa-clipboard-list',
        // The following grid shares a store with the classic version's grid as well!
        items: [{
            xtype: 'rental'
        }]
    }, {
        title: 'Cutomers',
        iconCls: 'fa-user',
        items: [{
            xtype: 'customer'
        }]
    }, {
        title: 'Movies',
        iconCls: 'fa-film',
        items: [{
            xtype: 'movie'
        }]
    }, {
        title: 'Done Transaction',
        iconCls: 'fa-clipboard-check', 
        bind: {
            html: '{loremIpsum}'
        }
    }]
});
