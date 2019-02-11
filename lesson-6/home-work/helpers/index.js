const validate = ({ data, name, instance }) => {

    if (typeof data !== 'object') {
        instance.emit(
            'error',
            new Error(`${name}: data should be an object`)
        );
    }

    if (!data.hasOwnProperty('algorithm')) {
        instance.emit(
            'error',
            new Error(`${name}: data should have required field algorithm`)
        );
    }

    if (!data.algorithm) {
        instance.emit(
            'error',
            new Error(`${name}: algorithm should not be empty`)
        );
    }

    if (typeof data.algorithm !== 'string') {
        instance.emit(
            'error',
            new Error(`${name}: algorithm should should be a string`)
        );
    }
};

const validateFields = ({ data, name, instance }) => {
    const allowedFields = [
        'algorithm'
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
