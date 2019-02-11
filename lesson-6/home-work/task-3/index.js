const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const { validate, validateFields } = require('../helpers');

class Archiver {
    constructor() {}

    _toZip(inFile, outFile) {

        const r = fs.createReadStream(path.join(__dirname, inFile));
        const w = fs.createWriteStream(path.join(__dirname, outFile));

        r.pipe(zlib.createGzip()).pipe(w);
    }

    fromZip(inFile, outFile) {
        const r = fs.createReadStream(path.join(__dirname, inFile));
        const w = fs.createWriteStream(path.join(__dirname, outFile));

        r.pipe(zlib.createGunzip()).pipe(w);
    }

}

const toArchiver = new Archiver();
// toArchiver._toZip('../data/comments.csv', '../data/comments.gz');
// toArchiver.fromZip('../data/comments.gz', '../data/comments.csv');
