const EventEmitter = require('events');

class DB extends EventEmitter {
    constructor() {
        super();
        this.init();
    }

    init() {
        this.on('store', data => {
            console.log('----------------From DB----------------\n', data);
        });
    }
}

module.exports = DB;
