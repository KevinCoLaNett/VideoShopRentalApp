Ext.define('VideoShopRental.view.customer.CustomerViewController', {
    extend: 'Ext.app.ViewController',

    alias: 'controller.customerviewcontroller', // used to instantiate in CustomerView.js

    init: function () {
        var customerStore = this.getViewModel().getStore('customers');
        customerStore.setPageSize(15);
        customerStore.setAutoLoad(true);
    },

    onSearchTextKeyUp: function (field, event) {
        if (event.getKey() === Ext.event.Event.ENTER) {
            var searchText = field.getValue();
            this.performSearch(searchText);
        }
    },

    performSearch: function () {
        var searchText = this.lookupReference('searchText').getValue();
        var grid = this.getView();

        // Get the store associated with the grid
        var store = grid.getStore();

        // Apply the search filter to the store
        store.clearFilter(); // Clear any previous filters
        if (searchText) {
            store.filterBy(function (record) {
                // Modify this condition to match your search logic
                var name = record.get('Name');name
                return name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1;
            });
        }
    },

    onRefreshClick: function (button) {
        var grid = button.up('grid');
        //reload the grid
        grid.getStore().clearFilter();
        grid.getStore().getSorters().clear();
        grid.getStore().reload();
        
        //set pageSize to default value = 15
        grid.getStore().setPageSize(15);
        grid.getStore().loadPage(1);

        //set itemsPerPageField to default value = 15
        var itemsPerPageField = this.lookupReference('itemsPerPageField');
        itemsPerPageField.setValue(15);

        //clear the searchfield
        var searchText = this.lookupReference('searchText');
        searchText.setValue('');
    },

    onItemsPerPageChange: function (field, newValue) {
        var store = this.getView().getStore();
        store.setPageSize(newValue);
        store.loadPage(1);
    },

    onAddCustomerClick: function () {
        var formType = 'add'; // Set the formType value here

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
                    xtype: 'customerformview', // Reference the form component
                    formType: formType
                }
            ]
        });

        formWindow.show();
    },

    onEditCustomerClick: function (grid, rowIndex, colIndex, item, e, record) {
        var formType = 'update'; // Set the formType value here

        // Create an instance of the MovieFormView component with the formType config option
        var customerForm = Ext.create('VideoShopRental.view.customer.CustomerFormView', {
            formType: formType
        });

        var formWindow = Ext.create('Ext.window.Window', {
            title: 'Update Customer',
            layout: 'fit',
            width: 400,
            padding: 10,
            modal: true,
            resizable: false, // Disable window resizing
            //draggable: false, // Disable window movement
            items: [
                {
                    xtype: 'customerformview', // Reference the form component
                    formType: formType, //pass the formType to the form
                    recordData: record.getData() // Pass the record data to the form
                }
            ]
        });

        formWindow.show();
    },

    onDeleteCustomerClick: function (button, rowIndex, colIndex, item, e, record) {
        var grid = button.up('grid'),
            customerStore = grid.getStore();


        Ext.Msg.confirm('Delete Customer', 'Are you sure you want to delete this customer?', function (btn) {
            if (btn === 'yes') {
                if (record !== -1) {
                    //console.log(record);
                    customerStore.remove(record);
                    customerStore.sync({
                        success: function () {
                            Ext.Msg.alert('Delete Customer', 'Customer deleted successfully!');
                        },
                        failure: function () {
                            Ext.Msg.alert('Delete Customer', 'Failed to Customer movie');
                        }
                    });
                } else {
                    Ext.Msg.alert('Delete Customer', 'Customer not found');
                }
            }
        });
    }
});