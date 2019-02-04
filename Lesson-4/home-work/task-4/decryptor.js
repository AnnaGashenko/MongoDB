const Ui = require('./readable.js');
const AccountManager = require('./writable.js');
const { Transform } = require('stream');

class Decryptor  extends Transform{
    constructor(options = {}) {
        super(options);
    }

    _transform(data, encoding, done) {
        const _data = data.payload;
        const algorithm = data.meta.algorithm;
        const chank = {
            name: _data.name,
            email: this._tranformToString(_data.email, algorithm),
            password: this._tranformToString(_data.password, algorithm)
        };

        this.push(chank);
        done();
    }

    _tranformToString(data, algorithm) {
        return Buffer.from(data, algorithm).toString();
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