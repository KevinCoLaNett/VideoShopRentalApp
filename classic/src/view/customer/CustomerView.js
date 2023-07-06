Ext.define('VideoShopRental.view.customer.CustomerView', {
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

    bind: {
        store: '{customers}',
        //selection: '{currentUser}'
    },

    controller: 'customerviewcontroller',
    viewModel: 'customerviewmodel',

    // tbar: [
    //     {
    //         xtype: 'button',
    //         text: 'Add New Customer',
    //         iconCls: 'x-fa fa-plus',
    //         //reference: 'btnAddCustomer',
    //         handler: 'onAddButtonClick'
    //     }
    // ],

    dockedItems: [{
        xtype: 'toolbar',
        dock: 'top',
        items: [{
            text: 'Add New Customer',
            handler: 'onAddCustomerClick'
        }]
    }],

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