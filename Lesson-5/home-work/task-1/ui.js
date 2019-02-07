const { Readable } = require('stream');

class Ui extends Readable {
    constructor(customers = [], options = {}) {
        super(options);

        this.customers = customers;
    }

    _read() {
        let customer = this.customers.shift();

        if (!customer) {
            this.push(null);
        } else {
            const modifiedCustomer = {
                payload: { ...customer },
                meta: {
                    source: Ui.name.toLowerCase()
                }
            };

            const data = {
                data: modifiedCustomer,
                name: Ui.name,
                instance: this
            };

            this.push(modifiedCustomer);
        }
    }
}

module.exports = Ui;