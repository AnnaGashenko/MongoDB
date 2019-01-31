const EventEmitter = require('events').EventEmitter;

class Bank extends EventEmitter {
    constructor() {
        super();
        this.id = 0;
        this.persons = [];

        this.on('add', (id, balance) => {
            const person = this.getPerson(id);
            this.on('error', error => {
                if(balance <= 0) {
                    console.error(`Сумма зачисления ${balance}, невозможно пополнить такую сумму`);
                } else {
                    person.balance = person.balance + balance;

                }
            })
        });

        this.on('send', (idSender, idRecipient, summa) => {
            this._checkExistenceId(idSender);
            this._checkExistenceId(idRecipient);

            if(summa <= 0) {
                this.on('error', error => {
                    console.error(`Сумма списания отрицательная = ${summ}`);
                });
            }  else {
                const sender = this.getPerson(idSender);
                const recipient = this.getPerson(idRecipient);
                sender.balance = sender.balance - summa;
                recipient.balance = recipient.balance + summa;
            }

        });

        this.on('get', (id, func) => {
            this._checkExistenceId(id);
            const person = this.getPerson(id);
            func(person.balance);

        });

        this.on('withdraw', (id, summ) => {
            this._checkExistenceId(id);
            const person = this.getPerson(id);
            const allow = person.balance - summ;

            if(allow <= 0) {
                this.on('error', error => {
                    console.error(`Недостаточно суммы для списания ${summ}, на вашем счету ${person.balance}`);
                });
            }  else if(summ < 0) {
                this.on('error', error => {
                    console.error(`Сумма списания отрицательная ${summ}`);
                });
            } else {
                person.balance = allow;
            }

        });

    }

    register(data) {
        this._checkExistenceName(data.name);
        this.id = this.id + 1;
        this.persons.push({...data, personId: this.id});
        return this.id;
    }

    getPerson(id) {
        return this.persons.find(({ personId }) => personId === id);
    }

    _checkExistenceId(id) {
        const person = this.persons.find(({ personId }) => personId === id);
        this.on('error', error => {
            if(!person) {
                throw new TypeError(
                    `Передан не существующий идентификатор = ${id}.`
                );
            }
        });
    }

    _checkExistenceName(personName) {
        const person = this.persons.find(({ name }) => name === personName);

        this.on('error', error => {
            if(person) {
                throw new TypeError(
                    `Person already exist. Person name: ${personName}`
                );
            }
        });
    }

}

const bank = new Bank();

const personId = bank.register({
    name: 'Pitter Black',
    balance: 100
});

bank.emit('withdraw', 3, 120);

const personId_2 = bank.register({
    name: 'Pitter Black',
    balance: 100
});

//bank.emit('send', personId, personId_2, 50);
//bank.emit('add', personId, 20);


// bank.emit('get', personId, (balance) => {
//     console.log(`I have ${balance} ₴`); // I have 120₴
// });

bank.emit('error');