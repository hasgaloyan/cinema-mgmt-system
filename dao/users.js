const co = require('coroutinify');
const connection = require('./connection');

class User {
    constructor () {
        return co(this);
    }

}

module.exports = new User();