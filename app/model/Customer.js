Ext.define('VideoShopRental.model.Customer', {
    extend: 'Ext.data.Model',

    fields: [
        {name: 'Name', type: 'string'},
        {name: 'Address', type: 'string'},
        {name: 'Email', type: 'string'},
        {name: 'ContactNumber', type: 'int'}
    ]
});