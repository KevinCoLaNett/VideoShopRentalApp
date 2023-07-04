Ext.define('VideoShopRental.view.RentalView', {
    extend: 'Ext.grid.Panel',
    xtype: 'rental',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.grid.column.Action',

        'VideoShopRental.store.Rental',
        'VideoShopRental.view.rental.RentalViewController'
    ],

    title: 'Rentals',

    store: {
        type: 'rental'
    },

    controller: 'rentalviewcontroller',

    tbar: [
        {
            xtype: 'button',
            text: 'Add New Rental',
            iconCls: 'x-fa fa-plus',
            reference: 'btnAddRental',
            handler: 'onAddButtonClick'
        }
    ],

    // tbar: [
    //     {
    //         xtype: 'button',
    //         itemId: 'add',
    //         text: 'Add',
    //         iconcls: 'fa-plus',
    //         reference: 'btnaddrental',
    //         handler: 'addPopup'
    //     },
    //     {
    //         xtype: 'button',
    //         itemId: 'edit',
    //         text: 'Edit',
    //         iconcls: 'fa-pencil',
    //         reference: 'btnedit',
    //         handler: 'updatePopup'
    //     },
    //     {
    //         xtype: 'button',
    //         itemId: 'delete',
    //         text: 'Delete',
    //         iconcls: 'fa-thrash',
    //         reference: 'btndelete'
    //     }
    // ],

    columns: [
        { text: 'Rental Date', dataIndex: 'RentalDate', flex: 1 },
        { text: 'Due Date', dataIndex: 'DueDate', flex: 1 },
        { text: 'Date Returned', dataIndex: 'DateReturned', flex: 1 },
        { text: 'Customer ID', dataIndex: 'CustomerId', flex: 0.5 },
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