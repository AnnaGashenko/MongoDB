const Ui = require('./readable.js');
const AccountManager = require('./writable.js');
const { Transform } = require('stream');

class Decryptor  extends Transform{
    constructor(options = {}) {
        super(options);
    }

    _transform(data, encoding, done) {
        const _data = data.payload;
        const chank = {
            name: _data.name,
            email: this._tranformHexToString(_data.email),
            password: this._tranformHexToString(_data.password)
        };

        this.push(chank);
        done();
    }

    _tranformHexToString(data) {
        return Buffer.from(data, 'hex').toString();
    }

}

const customers = [
    {
        payload: {
            name: 'Pitter Black',
            email: '70626c61636b40656d61696c2e636f6d',
            password: '70626c61636b5f313233'
        },
        meta: {
            algorithm: 'hex'
        }
    }
];


const r_options = {
    objectMode: true
};

const t_options = {
    objectMode: true
};

const w_options = {
    objectMode: true
};

const ui = new Ui(customers, r_options);
const decryptor = new Decryptor(t_options);
const manager = new AccountManager(w_options);
ui.pipe(decryptor).pipe(manager);