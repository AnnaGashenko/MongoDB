const { Writable } = require('stream');
const { validate, validateFields } = require('../helpers');
const crypto = require('crypto');
const fs = require('fs');

class AccountManager extends Writable {
    constructor(options = {}) {
        super(options);
        this.storage = new Map();
        this.algorithm = '';
        this.key = '';
        this.iv = '';
        this._init();
    }

    _init() {
        this.on('finish', () => {
            console.log('Finished');
        });
    }

    save(data) {
        const id = Date.now() + Math.floor(Math.random() * 10);
        const { payload, meta} = data;
        const log = {
            source: meta.source,
            payload
        };
        this.storage.set(id, log);
    }

    decryptor(str) {
        const decipher = crypto.createDecipheriv(
            this.algorithm,
            this.key,
            this.iv
        );
        let decrypted = decipher.update(str, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }

    _write(customer, encoding, done) {

        const {
            payload,
            meta: { algorithm, key, iv, source, signature }
        } = customer;

        this.algorithm = algorithm;
        this.key = key;
        this.iv = iv;

        const publicKey = fs.readFileSync('../certificates/server-cert.pem', 'utf-8')

        const verify = crypto.createVerify('RSA-SHA256');

        verify.update(JSON.stringify(payload));

        const verified = verify.verify(publicKey, Buffer.from(signature, 'hex'));

        if(verified) {
            const encryptedCustomer = {
                payload: {
                    ...payload,
                    email:  this.decryptor(payload.email),
                    password:  this.decryptor(payload.password)
                },
                meta: {
                    source: source
                }
            };

            const data = {
                data: encryptedCustomer,
                name: AccountManager.name,
                instance: this
            };

            validateFields(data);
            validate(data);

            this.save(encryptedCustomer);
            console.log(this.storage);
        } else {
            console.log('Верификация не успешная');
        }

        done();
    }
}

module.exports = AccountManager;
