Ext.define('VideoShopRental.view.customer.CustomerFormView', {
  extend: 'Ext.form.Panel',
  xtype: 'customerformview',

  controller: 'customerformcontroller',

  fieldDefaults: {
    labelAlign: "right",
    labelWidth: 115,
    msgTarget: 'side'
  },

  items: [{
    xtype: 'fieldset',
    title: 'Customer Information',

    defaultType: 'textfield',
    defaults: {
      anchor: '100%'
    },

    items: [{
      fieldLabel: 'Full Name',
      emptyText: 'Full Name',
      name: 'Name',
      itemId: 'nameField',
      allowBlank: false
    }, {
      fieldLabel: 'Address',
      emptyText: 'Adress',
      name: 'Address',
      allowBlank: false
    }, {
      fieldLabel: 'Email',
      emptyText: 'john@gmail.com',
      name: 'Email',
      vtype: 'email',
      allowBlank: false
    }, {
      fieldLabel: 'Contact Number',
      emptyText: '9453456789',
      name: 'contactnContactNumberumber',
      itemId: 'numberField',
      allowBlank: false
    }]
  }],

  buttons: [{
    text: 'Save',
    disabled: true,
    formBind: true,
    handler: 'onSaveCustomerClick'
  }],

  initComponent: function () {
    this.callParent(arguments);

    // Custom vtypes for validation
    Ext.apply(Ext.form.field.VTypes, {
      customName: function (value) {
        // Implement your custom name validation logic here
        // Return true if valid, false otherwise
        return /^[A-Za-z\s]+$/.test(value);
      },
      customNameText: 'Invalid name. Please enter a valid name containing only letters and spaces.',

      customNumber: function (value) {
        // Implement your custom number validation logic here
        // Return true if valid, false otherwise
        return /^\d+$/.test(value);
      },
      customNumberText: 'Invalid number. Please enter a valid number containing only digits.',

    });

    // Add the custom vtypes to the desired form fields
    var nameField = this.down('#nameField');
    nameField.vtype = 'customName';
    nameField.vtypeText = 'Invalid name. Please enter a valid name containing only letters and spaces.';

    var numberField = this.down('#numberField');
    numberField.vtype = 'customNumber';
    numberField.vtypeText = 'Invalid number. Please enter a valid number containing only digits.';

  }

});