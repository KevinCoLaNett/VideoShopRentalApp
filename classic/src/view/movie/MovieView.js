Ext.define('VideoShopRental.view.movie.MovieView', {
    extend: 'Ext.grid.Panel',
    xtype: 'movie',
    itemId: 'movieGrid',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.grid.column.Action',
        'Ext.toolbar.Paging',

        'VideoShopRental.store.Movie',
        'VideoShopRental.view.movie.MovieViewController',
        'VideoShopRental.view.movie.MovieFormView',
        'VideoShopRental.view.movie.MovieViewModel',
        'VideoShopRental.view.customer.CustomerViewController'
    ],

    title: 'Movies',

    // store: {
    //     type: 'movie'
    // },

    viewModel: {
        type: 'movieviewmodel'
    },

    bind: {
        store: '{movies}'
    },

    controller: 'movieviewcontroller',

    tbar: [
        {
            xtype: 'textfield',
            emptyText: 'Search...',
            width: 200,
            reference: 'searchText',
            enableKeyEvents: true,
            triggerCls: 'x-form-search-trigger',
            listeners: {
                keyup: 'onSearchTextKeyUp'
            }
        },
        {
            xtype: 'button',
            text: 'Refresh',
            iconCls: 'x-tbar-loading red',
            handler: 'onRefreshClick' // This is the handler function to be defined in your controller
        },
        '->', // Separator
        {
            xtype: 'button',
            text: 'Add New Movie',
            iconCls: 'x-fa fa-plus blue',
            reference: 'btnAddMovie',
            handler: 'onAddMovieClick'
        }
    ],

    columns: [
        { text: 'Title', dataIndex: 'Title', flex: 1 },
        { text: 'Genre', dataIndex: 'Genre', flex: 1 },
        { text: 'Release Date', dataIndex: 'ReleaseDate', xtype: 'datecolumn', format: 'Y-m-d', flex: 0.5 },
        { text: 'Rental Price', dataIndex: 'RentalPrice', flex: 0.5 },
        { text: 'Number In Stock', dataIndex: 'NumberInStock', flex: 0.5 },
        { text: 'Number Available', dataIndex: 'NumberAvailable', flex: 0.5 },
        {
            xtype: 'actioncolumn',
            text: 'Action',
            menuDisabled: true,
            sortable: false,
            flex: 0.5,
            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-edit blue',
                tooltip: 'Edit',
                reference: 'btnEditMovie',
                handler: 'onEditMovieClick'
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-trash red',
                tooltip: 'Delete',
                reference: 'btnDeleteMovie',
                handler: 'onDeleteMovieClick'
            }]
        }
    ],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying movies {0} - {1} of {2}',
        emptyMsg: "No movies to display"
    },

    listeners: {
        afterrender: function (grid) {
            var store = grid.getViewModel().getStore('movies');
            store.load();
        }
    },

    selModel: {
        injectCheckbox: 'first',
        checkOnly: true,
        model: 'SIMPLE',
        type: 'checkboxmodel'
    }
});