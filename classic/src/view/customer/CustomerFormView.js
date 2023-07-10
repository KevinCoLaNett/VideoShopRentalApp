Ext.define('VideoShopRental.view.customer.CustomerFormView', {
  extend: 'Ext.form.Panel',
  xtype: 'customerformview',

  controller: 'customerformcontroller',

  fieldDefaults: {
    labelAlign: "right",
    labelWidth: 115,
    msgTarget: 'side'
  },

  config: {
    formType: 'add', // Default form type is 'customer'
    recordData: null // Holds the record data for update form
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
      name: 'ContactNumber',
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

    // Set the form field values if it's an update form
    if (this.getFormType() === 'update') {
      this.setFormFieldValues(this.getRecordData());
    }

    //pass the formType and recordData
    var controller = this.getController();
    if (controller) {
      controller.setFormType(this.getFormType());
      controller.loadRecordData(this.getRecordData());
    }

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

  },

  setFormFieldValues: function (recordData) {
    var form = this.getForm();

    if (form) {
      form.setValues(recordData);
    }
  }

});