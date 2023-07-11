Ext.define('VideoShopRental.view.customer.CustomerView', {
    extend: 'Ext.grid.Panel',
    xtype: 'customer',
    itemId: 'customerGridId',
    requires: [
        'Ext.plugin.Viewport',
        'Ext.window.MessageBox',
        'Ext.grid.column.Action',

        'VideoShopRental.store.Customer',
        'VideoShopRental.view.customer.CustomerViewController',
        'VideoShopRental.view.customer.CustomerViewModel'
    ],

    title: 'Customers',

    // store: {
    //     type: 'customer'
    // },

    viewModel: {
        type: 'customerviewmodel'
    }, 

    bind: {
        store: '{customers}',
    },

    controller: 'customerviewcontroller',

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
            text: 'Add New Customer',
            iconCls: 'x-fa fa-plus blue',
            reference: 'btnAddCustomer',
            handler: 'onAddCustomerClick'
        }
    ],

    // dockedItems: [{
    //     xtype: 'toolbar',
    //     dock: 'top',
    //     items: [{
    //         text: 'Add New Customer',
    //         handler: 'onAddCustomerClick'
    //     }]
    // }],

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
                iconCls: 'x-fa fa-edit blue',
                tooltip: 'Edit',
                reference: 'btnEditCustomer',
                handler: 'onEditCustomerClick'
            }, {
                xtype: 'button',
                iconCls: 'x-fa fa-trash red',
                tooltip: 'Delete',
                reference: 'btnEditCustomer',
                handler: 'onDeleteCustomerClick'
            }]
        }
    ],

    bbar: {
        xtype: 'pagingtoolbar',
        displayInfo: true,
        displayMsg: 'Displaying customers {0} - {1} of {2}',
        emptyMsg: "No customers to display"
    },

    listeners: {
        afterrender: function (grid) {
            var store = grid.getViewModel().getStore('customers');
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