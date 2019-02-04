const { Writable } = require('stream');

class AccountManager extends Writable {
    constructor(options = {}) {
        super(options);
    }

    _write(chunk, encoding, done) {
        console.log('payload:', chunk.payload);
        done();
    }
}

module.exports = AccountManager;
