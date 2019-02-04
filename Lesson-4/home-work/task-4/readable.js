const { Readable } = require('stream');

class UI extends Readable {
    constructor(data = [], options = {}) {
        super(options);
        this.customer = data;
        this.on('data', chunk => {});

        this._init();
    }
    _init() {
        this.on('error', error => {
            console.error(`We have a problem: ${error.message}`);
            process.exit(1);
        });
    }
    _read() {
        let data = this.customer.shift();
        if (!data) {
            this.push(null);
        } else {
            this._validateCustomer(data);
            this.push(data);
        }
    }

    _validateCustomer(customer) {

        if (customer && typeof customer !== 'object') {
            this.emit('error', new Error('customer should be an object'));
        }

        const templateObject = JSON.stringify(['payload', 'meta']);
        const customerObject= JSON.stringify(Object.keys(customer));

        const templatePayload =  JSON.stringify(['name', 'email', 'password']);
        const customerPayload = JSON.stringify(Object.keys(customer.payload));

        const templateMeta =  JSON.stringify(['algorithm']);
        const customerMeta = JSON.stringify(Object.keys(customer.meta));

        if (templateObject !== customerObject || templatePayload !== customerPayload || templateMeta !== customerMeta) {
            this.emit(
                'error',
                new Error('property bad')
            );
        }


        if (!customer.hasOwnProperty('meta')) {
            this.emit(
                'error',
                new Error('customer should have a meta property')
            );
        }

        if (!customer.payload.hasOwnProperty('name')) {
            this.emit(
                'error',
                new Error('customer should have a name property')
            );
        }

        if (!customer.payload.hasOwnProperty('email')) {
            this.emit(
                'error',
                new Error('customer should have a email property')
            );
        }

        if (!customer.payload.hasOwnProperty('password')) {
            this.emit(
                'error',
                new Error('customer should have a password property')
            );
        }


        if (typeof customer.payload.name !== 'string' || customer.payload.name === '') {
            this.emit('error', new Error('name should a string'));
        }

        if (typeof customer.payload.email !== 'string' || customer.payload.email === '') {
            this.emit('error', new Error('email should a string'));
        }

        if (typeof customer.payload.password !== 'string' || customer.payload.password === '') {
            this.emit('error', new Error('password should a string'));
        }

        if (typeof customer.meta.algorithm !== 'string' || customer.meta.algorithm === '') {
            this.emit('error', new Error('algorithm should a string'));
        }

        if(customer.meta.algorithm !== 'hex' && customer.meta.algorithm !== 'base64') {
            this.emit('error', new Error('algorithm should be hex or base64'));
        }

    }
}

module.exports = UI;
