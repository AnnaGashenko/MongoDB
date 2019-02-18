const net = require('net');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const server = net.createServer();
const PORT = process.env.PORT || 1024;

class Server {
    constructor(fileName) {
        this.fileName = fileName;
        this.readFile = promisify(fs.readFile);
        this._init();
        this.file = [];
    }

    _init() {
        server.on('connection', socket => {
            socket.setEncoding('utf8');
            console.log('New client connected!');

            socket.on('data', msg => {

                // this.readFile(path.join(__dirname, this.fileName), { encoding: 'utf8' }).then(data => {
                //     const source = JSON.parse(data);
                //     const filter = JSON.parse(msg);
                //     const getFilter =  this._filter(source, filter);
                //     console.log('getFilter', filter);
                // });

                this.readFile(path.join(__dirname, this.fileName), { encoding: 'utf8' })
                    .then(data => {
                        const source = JSON.parse(data);
                        const filter = JSON.parse(msg);
                        const getFilter =  this._filter(source, filter);
                        console.log('getFilter', getFilter);

                    })
                    .catch(error => {
                        console.error(error.message);
                    });


            });

            socket.on('end', () => {
                console.log('Client is disconnected!');
            });
        });

        server.on('listening', () => {
            const { port } = server.address();
            console.log(`TCP Server started on port ${port}!`);
        });

        server.listen(PORT);
    }

     _filter(data , filter) {
        const source = data.map(item => {
            const obj = {};
            for (const key in item) {
                const isExist = data.some(
                    (field) => field === key
                );
                if (isExist) {
                    obj[key] = item[key];
                }
            }

            return obj;

        });

        console.log(source);

        return source;
    };
}



try {
    const server = new Server('users.json');
} catch ({ message }) {
    console.error(message);
}

