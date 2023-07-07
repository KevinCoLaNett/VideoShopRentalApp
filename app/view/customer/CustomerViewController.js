Ext.define('VideoShopRental.view.customer.CustomerViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.customerviewcontroller', // used to instantiate in CustomerView.js

    onAddCustomerClick: function () {
        var formWindow = Ext.create('Ext.window.Window', {
            title: 'Add Customer',
            layout: 'fit',
            width: 400,
            padding: 10,
            modal: true,
            resizable: false, // Disable window resizing
            //draggable: false, // Disable window movement
            items: [
                {
                    xtype: 'customerformview' // Reference the form component
                }
            ]
        });

        formWindow.show();
    },

    onEditCustomerClick: function () {
        console.log('Edit This Customer');
    },

    onDeleteCustomerClick: function (button, rowIndex, colIndex, item, e, record) {
        var grid = button.up('grid'),
            store = grid.getStore(),
            customerId = record.get('CustomerId');

        Ext.Msg.confirm('Delete Customer', 'Are you sure you want to delete this customer?', function (btn) {
            if (btn === 'yes') {

                store.remove(record);
                //console.log(record);
                Ext.Ajax.request({
                    url: 'https://localhost:44348/api/Customers/' + customerId,
                    method: 'DELETE',
                    success: function () {
                      Ext.Msg.alert('Delete Customer', 'Customer deleted successfully');
                    },
                    failure: function () {
                      Ext.Msg.alert('Delete Customer', 'Failed to Customer movie');
                    }
                });
            }
        });
    }
});