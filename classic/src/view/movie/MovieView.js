Ext.define('VideoShopRental.view.movie.MovieView', {
    extend: 'Ext.grid.Panel',
    xtype: 'movie',
    itemId: 'movieGrid',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.grid.column.Action',

        'VideoShopRental.store.Movie',
        'VideoShopRental.view.movie.MovieViewController',
        'VideoShopRental.view.movie.MovieFormView'
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
            xtype: 'button',
            text: 'Add New Movie',
            iconCls: 'x-fa fa-plus',
            reference: 'btnAddMovie',
            handler: 'onAddMovieClick'
        }
    ],

    columns: [
        //{ text: 'MovieId', dataIndex: 'MovieId', flex: 1 },
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
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit',
                reference: 'btnEditMovie',
                handler: 'onEditMovieClick'
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete',
                reference: 'btnDeleteMovie',
                handler: 'onDeleteMovieClick'
            }]
        }
    ],

    selModel: {
        injectCheckbox: 'first',
        checkOnly: true,
        model: 'SIMPLE',
        type: 'checkboxmodel'
    }
});