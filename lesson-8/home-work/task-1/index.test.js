
const { validate, validateFields } = require('./');

describe('Test validateFields:', () => {
    test('data contains not allowed field some into object ', () => {
        const data =
            {
                data: {
                    payload: {
                        some: '',
                        name: 'Oliver White',
                        email: 'owhite@email.com',
                        password: 'owhite_456'
                    },
                    meta: {
                        source: 'ui'
                    }
                },
                name: 'Test',
                instance: this
            };
        expect(() => validateFields(data)).toThrow(Error);
    });
    test('data contains not allowed object some', () => {
        const data =
            {
                data: {
                    some: {},
                    payload: {
                        name: 'Oliver White',
                        email: 'owhite@email.com',
                        password: 'owhite_456'
                    },
                    meta: {
                        source: 'ui'
                    }
                },
                name: 'Test',
                instance: this
            };
        expect(() => validateFields(data)).toThrow(Error);
    });
});

describe('Test validate:', () => {
    test('payload should be object ', () => {
        const data =
            {
                data: [],
                name: 'Test',
                instance: this
            };
        expect(() => validate(data)).toThrow(Error);
    });

    test('payload receive Error if the name does not exist', () => {
        const data =
            {
                data: {
                    payload: {
                        //name: 'Oliver White',
                        email: 'owhite@email.com',
                        password: 'owhite_456'
                    },
                    meta: {
                        source: 'ui'
                    }
                },
                name: 'Test',
                instance: this
            };
        expect(() => validate(data)).toThrow(Error);
    });

    test('payload.name should not be empty', () => {
        const data =
            {
                data: {
                    payload: {
                        name: '',
                        email: 'owhite@email.com',
                        password: 'owhite_456'
                    },
                    meta: {
                        source: 'ui'
                    }
                },
                name: 'Test',
                instance: this
            };
        expect(() => validate(data)).toThrow(Error);
    });

    test('payload.name should should be a string', () => {
        const data =
            {
                data: {
                    payload: {
                        name: [],
                        email: 'owhite@email.com',
                        password: 'owhite_456'
                    },
                    meta: {
                        source: 'ui'
                    }
                },
                name: 'Test',
                instance: this
            };
        expect(() => validate(data)).toThrow(Error);
    });

    test('payload receive Error if the email does not exist', () => {
        const data =
            {
                data: {
                    payload: {
                        name: 'Oliver White',
                        //email: 'owhite@email.com',
                        password: 'owhite_456'
                    },
                    meta: {
                        source: 'ui'
                    }
                },
                name: 'Test',
                instance: this
            };
        expect(() => validate(data)).toThrow(Error);
    });

    test('payload.email should not be empty', () => {
        const data =
            {
                data: {
                    payload: {
                        name: 'Oliver White',
                        email: '',
                        password: 'owhite_456'
                    },
                    meta: {
                        source: 'ui'
                    }
                },
                name: 'Test',
                instance: this
            };
        expect(() => validate(data)).toThrow(Error);
    });

    test('payload.email should should be a string', () => {
        const data =
            {
                data: {
                    payload: {
                        name: 'Oliver White',
                        email: [],
                        password: 'owhite_456'
                    },
                    meta: {
                        source: 'ui'
                    }
                },
                name: 'Test',
                instance: this
            };
        expect(() => validate(data)).toThrow(Error);
    });

    test('payload receive Error if the password does not exist', () => {
        const data =
            {
                data: {
                    payload: {
                        name: 'Oliver White',
                        email: 'owhite@email.com',
                        //password: 'owhite_456'
                    },
                    meta: {
                        source: 'ui'
                    }
                },
                name: 'Test',
                instance: this
            };
        expect(() => validate(data)).toThrow(Error);
    });

    test('payload.password should not be empty', () => {
        const data =
            {
                data: {
                    payload: {
                        name: 'Oliver White',
                        email: 'owhite@email.com',
                        password: ''
                    },
                    meta: {
                        source: 'ui'
                    }
                },
                name: 'Test',
                instance: this
            };
        expect(() => validate(data)).toThrow(Error);
    });

    test('payload.password should should be a string', () => {
        const data =
            {
                data: {
                    payload: {
                        name: 'Oliver White',
                        email: 'owhite@email.com',
                        password: []
                    },
                    meta: {
                        source: 'ui'
                    }
                },
                name: 'Test',
                instance: this
            };
        expect(() => validate(data)).toThrow(Error);
    });

    test('payload.email should be a string', () => {
        const data =
            {
                data: {
                    payload: {
                        name: 'Oliver White',
                        email: {},
                        password: 'owhite_456'
                    },
                    meta: {
                        source: 'ui'
                    }
                },
                name: 'Test',
                instance: this
            };
        expect(() => validate(data)).toThrow(Error);
    });
});