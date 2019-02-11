const fs = require('fs');
const path = require('path');
const http = require('http');
const zlib = require('zlib');
const EventEmitter = require('events');
const { validate, validateFields } = require('../helpers');

class Archiver extends EventEmitter{
    constructor( param ) {
        super();
        this.param = param;
        this._init();
    }

    _init() {
        this.on('error', ({ message }) => {
            console.log(message);
            process.exit(1);
        })
    }

    _toZip(inFile, outFile) {

        const data = {
            data: this.param,
            name: Archiver.name,
            instance: this
        };

        validateFields(data);
        validate(data);

        this.on('error', ({ message }) => {
            console.log(message);
            process.exit(1);
        })

        const r = fs.createReadStream(path.join(__dirname, inFile));
        const w = fs.createWriteStream(path.join(__dirname, outFile));

        let compress;
        if(this.param.algorithm === 'deflate') {
            compress = zlib.createDeflate();
        }  else if (this.param.algorithm === 'gzip') {
            compress = zlib.createGzip();
        }

        r.pipe(compress).pipe(w);

    }

    fromZip(inFile, outFile) {
        const r = fs.createReadStream(path.join(__dirname, inFile));
        const w = fs.createWriteStream(path.join(__dirname, outFile));

        r.pipe(zlib.createGunzip()).pipe(w);

    }

}
const algorithm = {
    algorithm: 'deflate'
};

const toArchiver = new Archiver(algorithm);
toArchiver._toZip('../data/comments.csv', '../data/comments.gz');
//toArchiver.fromZip('../data/comments.gz', '../data/comments.csv');
