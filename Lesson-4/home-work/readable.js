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
        const templateObject =  JSON.stringify(['name', 'email', 'password']);
        const customerObject = JSON.stringify(Object.keys(customer));

        if (templateObject !== customerObject) {
            this.emit(
                'error',
                new Error('property bad')
            );
        }


        if (customer && typeof customer !== 'object') {
            this.emit('error', new Error('customer should be an object'));
        }

        if (!customer.hasOwnProperty('name')) {
            this.emit(
                'error',
                new Error('customer should have a name property')
            );
        }

        if (!customer.hasOwnProperty('email')) {
            this.emit(
                'error',
                new Error('customer should have a email property')
            );
        }

        if (!customer.hasOwnProperty('password')) {
            this.emit(
                'error',
                new Error('customer should have a password property')
            );
        }

        if (typeof customer.name !== 'string') {
            this.emit('error', new Error('name should a string'));
        }

        if (typeof customer.email !== 'string') {
            this.emit('error', new Error('email should a string'));
        }

        if (typeof customer.password !== 'string') {
            this.emit('error', new Error('password should a string'));
        }

    }
}

module.exports = UI;
