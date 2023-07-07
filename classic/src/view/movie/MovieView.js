Ext.define('VideoShopRental.view.movie.MovieView', {
    extend: 'Ext.grid.Panel',
    xtype: 'movie',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.grid.column.Action',

        'VideoShopRental.store.Movie',
        'VideoShopRental.view.movie.MovieViewController'
    ],

    title: 'Movies',

    store: {
        type: 'movie'
    },

    bind: {
        store: '{movies}',
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
        { text: 'Title', dataIndex: 'Title', flex: 1 },
        { text: 'Genre', dataIndex: 'Genre', flex: 1 },
        { text: 'Release Date', dataIndex: 'ReleaseDate',  xtype: 'datecolumn', format: 'Y-m-d', flex: 1 },
        { text: 'Rental Price', dataIndex: 'RentalPrice', flex: 1 },
        { text: 'Number In Stock', dataIndex: 'NumberInStock', flex: 1 },
        { text: 'Number Available', dataIndex: 'NumberAvailable', flex: 1 },
        {
            xtype: 'actioncolumn',
            text: 'Action',
            menuDisabled: true,
            sortable: false,
            flex: 0.4,
            items: [{
                xtype: 'button',
                iconCls: 'x-fa fa-edit',
                tooltip: 'Edit'
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-trash',
                tooltip: 'Delete'
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