const { Transform } = require('stream');
const { validate, validateFields } = require('../helpers');
const crypto = require('crypto');
const fs = require('fs');

class Guardian extends Transform {
    constructor(options = {}) {
        super(options);
        this.algorithm = 'aes192';
        this.pass = '1qaZxsw2@3edcVfr4';
        this.key = crypto.scryptSync(this.pass, 'salt', 24);
        this.buf = Buffer.alloc(16);
        this.iv = crypto.randomFillSync(this.buf, 10);
    }

    _transform(customer, encoding, done) {
        const { payload: { email, password }, payload, meta } = customer;

        const encryptedCustomer = {
            payload: {
                ...payload,
                email: this._toCrypt(email),
                password: this._toCrypt(password)
            },
            meta: {
                source: meta.source,
                algorithm: this.algorithm,
                key: this.key,
                iv: this.iv
            }
        };

        const signature = this._create(encryptedCustomer.payload);
        encryptedCustomer.meta.signature = signature;

        const data = {
            data: encryptedCustomer,
            name: Guardian.name,
            instance: this
        };

        validateFields(data);
        validate(data);

        this.push(encryptedCustomer);
        done();
    }

    _create(payload) {
        const sign = crypto.createSign('RSA-SHA256');
        const private_key = fs.readFileSync('../certificates/server-key.pem', 'utf-8');
        sign.update(JSON.stringify(payload)); // например это какой то документ, в данном случае строка
        const signature = sign.sign(private_key, 'hex');
        return signature;
    }

    _toCrypt(data) {
        const cipher = crypto.createCipheriv(this.algorithm, this.key, this.iv);
        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;

    }
}

module.exports = Guardian;
