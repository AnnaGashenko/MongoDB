// Instruments
const { Bank } = require('./');

describe('Test Bank:', () => {
    test('validate customer ', () => {
        const bank = new Bank();
        const customer  = {
            name: 'Pitter Black',
            balance: 100
        };
        expect(() => bank._validateCustomer(customer)).toThrow(Error);
    });

    test('register ', () => {
        const bank = new Bank();
        //const id = Date.now() + Math.floor(Math.random() * 10);

        const mockMath = Object.create(global.Math);
        mockMath.random = () => 0.5;
        global.Math = jest.fn(() => mockMath);

        const customer  = {
            name: 'Pitter Black',
            balance: 100
        };

        expect(bank.register(customer)).toEqual(0.5);
    });


    // test('__checkForDuplicates ', () => {
    //     const bank = new Bank();
    //     const customer  = {
    //         name: 'Pitter Black',
    //         balance: 100
    //     };
    //     expect(() => bank._checkForDuplicates(customer)).toThrow(Error);
    // });
});
