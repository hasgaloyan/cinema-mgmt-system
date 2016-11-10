const co = require('coroutinify');
const connection = require('./connection');

class Movies {
    constructor () {
        return co(this);
    }

    *getMovie() {
        let rows = yield connection.queryAsync('SELECT 222 as result');
        return {
            title: 'Prestige',
            director: 'Christopher Nolan',
            rows: rows
        };
    }
}

module.exports = new Movies();
