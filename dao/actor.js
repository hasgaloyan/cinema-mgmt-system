const co = require('coroutinify');
const connection = require('./connection');

class Actor {
    constructor() {
        return co(this);
    }

    *getActors() {
        let rows = yield connection.queryAsync(`SELECT *
        FROM Actor`);
        return rows;
    }

    *getActor(id) {
        let rows = yield connection.queryAsync(`SELECT
            * FROM Actor WHERE ID=${id}`);
        return rows[0];
    }


    *getActorsByName(name) {
        let rows = yield connection.queryAsync(`SELECT
            ${name} as name,
            "July 3, 1962" as birth`);
        return rows;
    }

    // *getActorsByAge(agefrom, ageto) {
    //     let rows = yield  connection.queryAsync(`SELECT
    //         * FROM Actor WHERE shkjbhsj`) //TODO
    // }
}

module.exports = new Actor();
