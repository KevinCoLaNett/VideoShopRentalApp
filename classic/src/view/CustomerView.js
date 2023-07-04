Ext.define('VideoShopRental.view.CustomerView', {
    extend: 'Ext.grid.Panel',
    xtype: 'customer',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.grid.column.Action',

        'VideoShopRental.store.Customer',
        'VideoShopRental.view.customer.CustomerViewController'
    ],

    title: 'Customers',

    store: {
        type: 'customer'
    },

    controller: 'customerviewcontroller',

    tbar: [
        {
            xtype: 'button',
            text: 'Add New Customer',
            iconCls: 'x-fa fa-plus',
            reference: 'btnAddCustomer',
            handler: 'onAddButtonClick'
        }
    ],

    // tbar: [
    //     {
    //         xtype: 'button',
    //         itemId: 'add',
    //         text: 'Add',
    //         iconcls: 'fa-plus',
    //         reference: 'btnaddcustomer',
    //         handler: 'addPopup'
    //     },
        // {
        //     xtype: 'button',
        //     itemId: 'edit',
        //     text: 'Edit',
        //     iconcls: 'fa-pencil',
        //     reference: 'btnedit',
        //     handler: 'updatePopup'
        // },
        // {
        //     xtype: 'button',
        //     itemId: 'delete',
        //     text: 'Delete',
        //     iconcls: 'fa-thrash',
        //     reference: 'btndelete'
        // }
    // ],

    columns: [
        { text: 'Name', dataIndex: 'Name', flex: 1 },
        { text: 'Address', dataIndex: 'Address', flex: 1 },
        { text: 'Email', dataIndex: 'Email', flex: 1 },
        { text: 'Contact Number', dataIndex: 'ContactNumber', flex: 1 },
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