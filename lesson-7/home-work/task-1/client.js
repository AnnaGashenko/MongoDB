const net = require('net');

const client = new net.Socket();
const filter = {
    name: {
        first: 'John'
    },
    address: {
        email: '@gmail.com'
    }
};

client.connect(1024, () => {
    console.log('Connected!');

    client.write(JSON.stringify(filter));
});

client.on('data', data => {
    console.log(data.toString());
});

client.on('close', () => {
    console.log('Connection closed!');
});
