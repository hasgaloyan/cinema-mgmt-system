const co = require('coroutinify');
const connection = require('./connection');

class Movies {
    constructor () {
        return co(this);
    }

    *getMovies () {
        let rows = yield connection.queryAsync(`SELECT
            "Prestige" as title,
            "Christopher Nolan" as director,
            5 as rate
        UNION
        SELECT
            "Match Point" as title,
            "Woody Allen" as director,
            5 as rate
        UNION
        SELECT
            "A Love Song for Bobby Long" as title,
            "Shainee Gabel" as director,
            5 as rate`);
        return rows;
    }
}

module.exports = new Movies();
