const co = require('coroutinify');
const connection = require('./connection');

class Actors {
    constructor () {
        return co(this);
    }

    *getActors () {
        let rows = yield connection.queryAsync(`SELECT
            "Tom Cruise" as name,
            "July 3, 1962" as birth
        UNION
        SELECT
            "Michael Caine" as name,
            "March 14, 1933" as birth
        UNION
        SELECT
            "Ben Affleck" as name,
            "August 15, 1972" as birth
        `);
        return rows;
    }
}

module.exports = new Actors();
