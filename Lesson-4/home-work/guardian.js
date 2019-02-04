const Ui = require('./readable.js');
const AccountManager = require('./writable.js');
const Logger = require('./logger.js');
const { Transform } = require('stream');

class Guardian extends Transform {
    constructor(options = {}) {
        super(options);
    }

    _transform(data, encoding, done) {
        const chank = {
            meta: {
                source: 'ui'
            },
            payload: {
                name: data.name,
                email: this._tranformToHex(data.email),
                password: this._tranformToHex(data.password)
            }
        };

        this.push(chank);
        done();
    }

    _tranformToHex(data) {
        return Buffer.from(data).toString('hex');
    }

    _flush(done) {
        console.log('From _flush ####do something before stream is finished###');
        done();
    }
}

const customers = [
    {
        name: 'Pitter Black',
        email: 'pblack@email.com',
        password: 'pblack_123',
        hello: 'jjj'
    },
    {
        name: 'Oliver White',
        email: 'owhite@email.com',
        password: 'owhite_456'
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

const logger_options = {
    objectMode: true
};

const ui = new Ui(customers, r_options);
const guardian = new Guardian(t_options);
const manager = new AccountManager(w_options);
const logger = new Logger(logger_options);
ui.pipe(guardian).pipe(logger).pipe(manager);
