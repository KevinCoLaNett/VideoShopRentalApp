Ext.define('VideoShopRental.view.rental.RentalView', {
    extend: 'Ext.grid.Panel',
    xtype: 'rental',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.grid.column.Action',

        'VideoShopRental.store.Rental',
        'VideoShopRental.view.rental.RentalViewController',
        'VideoShopRental.view.rental.RentalViewModel'
    ],

    title: 'Rentals',

    viewModel: {
        type: 'rentalviewmodel'
    },

    bind: {
        store: '{rentals}'
    },

    controller: 'rentalviewcontroller',

    tbar: [
        {
            xtype: 'textfield',
            emptyText: 'Search by Title',
            width: 200,
            reference: 'searchText',
            enableKeyEvents: true,
            triggers: {
                search: {
                    cls: 'x-form-search-trigger',
                    handler: 'performSearch'
                }
            },
            listeners: {
                keyup: 'onSearchTextKeyUp'
            }
        },
        {
            xtype: 'button',
            text: 'Refresh',
            iconCls: 'x-tbar-loading',
            handler: 'onRefreshClick' // This is the handler function to be defined in your controller
        },
        '->', // Separator
        {
            xtype: 'button',
            text: 'Add New Rental',
            iconCls: 'x-fa fa-plus blue',
            reference: 'btnAddRental',
            handler: 'onAddButtonClick'
        }
    ],

    columns: [
        { text: 'Customer Name', dataIndex: 'Customer', renderer: function (value) { return value ? value.Name : ''; }, flex: 1 },
        { text: 'Rental Date', dataIndex: 'RentalDate', xtype: 'datecolumn', format: 'd-m-Y' },
        { text: 'Return Date', dataIndex: 'ReturnDate', xtype: 'datecolumn', format: 'd-m-Y' },
        { text: 'Total Rental Fee', dataIndex: 'TotalRentalFee' },
        { text: 'Rented Movies', dataIndex: 'RentalDetails', renderer: 'listOfRentedMovies' , flex: 1 },
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
                reference: 'btnEditRental',
                handler: 'onEditRentalClick'
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-trash red',
                tooltip: 'Delete',
                reference: 'btnDeleteRental',
                handler: 'onDeleteRentalClick'
            }]
        }
    ],

    selModel: {
        injectCheckbox: 'first',
        checkOnly: true,
        model: 'SIMPLE',
        type: 'checkboxmodel'
    },

    listeners: {
        afterrender: function (grid) {
            var store = grid.getViewModel().getStore('rentals');
            store.load();
        }
    }
});