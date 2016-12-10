const co = require('coroutinify');
const connection = require('./connection');

class User {
    constructor () {
        return co(this);
    }

    *signIn (args) {

        let username = args.username;
        let password = args.password;

        let rows = yield connection.queryAsync(`SELECT * FROM User WHERE UserName = "${username}" AND UserPassword = "${password}"`);
        return rows;
    }

    *getProfile () {
        let rows = yield connection.queryAsync(`SELECT
            * FROM User`);
        return rows;
    }
}
module.exports = new User();