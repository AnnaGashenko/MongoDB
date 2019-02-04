const { Writable } = require('stream');

class AccountManager extends Writable {
    constructor(options = {}) {
        super(options);
    }

    _write(chunk, encoding, done) {
        console.log('-------- From AccountManager -----------\n', chunk);
        done(); // callback функция к-я говорить что данный chunk загружен
    }
}

module.exports = AccountManager;
