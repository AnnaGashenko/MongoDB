const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

class Json2csv {
    constructor() {
        this.posts = [];
    }

    transform(posts, options) {
        this.posts = JSON.parse(posts);

        const filterPost = this.posts.filter(item => {
            for(const key in options) {
                title += `${key};`;
            }
        });

        let title = '';
        let body = '';
        this.posts.forEach(function (item) {
            if(!title) {
                for(const key in item) {
                    title += `${key};`;
                }
            }
            for(const key in item) {
                body += `${item[key]};`;
            }
            body = body.slice(0, -1);
            body += '\n';
        });
        const postToCsv = `${title.slice(0, -1)}\n${body}`;
        return postToCsv;
    }
}

const json2Csv = new Json2csv();
const readFile = promisify(fs.readFile);

const title = ['postId', 'name', 'body'];

readFile(path.join(__dirname, '../data/comments.json'), { encoding: 'utf8' })
    .then(data => {
        const postToCsv = json2Csv.transform(data, title);
        // fs.writeFile(path.join(__dirname, '../data/comments.csv'), postToCsv, error => {
        //     if (error) {
        //         throw error;
        //     }
        // });
    })
    .catch(error => {
        console.error(error.message);
    });
