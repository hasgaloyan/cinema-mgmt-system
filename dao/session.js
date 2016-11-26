const co = require('coroutinify');
const connection = require('./connection');

class Session {
    constructor() {
        return co(this);
    }
}



module.exports = new Session();