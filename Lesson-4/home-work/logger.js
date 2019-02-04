const { Transform } = require('stream');
const Db = require('./db.js');

class Logger extends Transform {
    constructor (options = {}) {
        super(options);
        this.db = new Db();
    }
    _transform(data, encoding, done) {

        const chank = {
            source: data.meta.source, // откуда пришли данные
            payload: data.payload, // данные которые передаются
            created: new Date() // время записи лога в базу
        };

        this.db.emit('store', chank);

        done();
    }
}


module.exports = Logger;