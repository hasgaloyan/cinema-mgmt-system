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
            * FROM Actor WHERE FirstName Like "${name}%" OR LastName="${name}"`);
        return rows;
    }

    *getActorsByAge(agefrom, ageto) {
        let rows = yield  connection.queryAsync(`SELECT
            * FROM Actor WHERE Age >= ${agefrom} AND
            Age <= ${ageto}`) //TODO
    }
}

module.exports = new Actor();
