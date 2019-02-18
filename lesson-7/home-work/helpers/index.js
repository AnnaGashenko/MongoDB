const validate = ({ data, instance }) => {

    if (typeof data.name !== 'object') {
        instance.emit(
            'error',
            new Error(`name should be an object`)
        );
    }

    if (typeof data.address !== 'object') {
        instance.emit(
            'error',
            new Error(`address should be an object`)
        );
    }

};

const validateFields = ({ data, name, instance }) => {
    const allowedFields = [
        'name',
        'first',
        'last',
        'phone',
        'address',
        'zip',
        'city',
        'country',
        'street',
        'email'
    ];

    for (const key in data) {
        if (data.hasOwnProperty(key) && typeof data[key] !== 'object') {
            const isExist = allowedFields.some(field => field === key);

            if (!isExist) {
                instance.emit(
                    'error',
                    new Error(
                        `${name}: data contains not allowed field — ${key}`
                    )
                );
            }
        } else {
            const isExist = allowedFields.some(field => field === key);

            if (!isExist) {
                instance.emit(
                    'error',
                    new Error(
                        `${name}: data contains not allowed field — ${key}`
                    )
                );
            }
            validateFields({ data: data[key], name, instance });
        }
    }
};

module.exports = { validate, validateFields };
