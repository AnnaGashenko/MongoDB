// Instruments

const { Bank } = require('./');

describe('Test Bank:', () => {

    test('register ', () => {
        const bank = new Bank();
        //bank._checkForDuplicates = jest.fn();

        global.Math.random = jest.fn(() => 0.5);
        global.Date.now = jest.fn(() => 1550488328804);

        const customer = {
            name: 'Pitter Black',
            balance: 100
        };

        expect(bank.register(customer)).toEqual(1550488328809);
        expect(() => bank.register(customer)).toThrow(`duplicated customer for name: '${customer.name}'`);
    });


    test('should throw on enroll if amount is 0', () => {
        const bank = new Bank();
        expect(() => bank.emit('add', 1550488328809, 0)).toThrow(`amount should be grater than 0`);

    });

    test('customer with not found', () => {
        const bank = new Bank();
        const personId = 1550488328809;
        expect(() => bank.emit('add', personId, 8)).toThrow(`customer with id '${personId}' not found`);

    });

    // test('return balance', () => {
    //     const bank = new Bank();
    //     const personId = 1550488328809;
    //     expect(bank._enroll(personId, 10)).toBe(110);
    // });




    // test('add', () => {
    //     const bank = new Bank();
    //     expect(() => bank.emit('add', 1550488328809, 0)).toThrow(`amount should be grater than 0`);
    //
    // });


    // test('_enroll ', () => {
    //     const bank = new Bank();
    //     expect(() => bank.emit('add', 1550488328809, 0)).toThrow(bank.emit('error'));
    // });

});
