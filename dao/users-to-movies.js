/**
 * Created by has on 11/12/16.
 * Defines the mapping between the users and movies through Rating.
 * Movie can have only one rating from each user.
 */

const co = require('coroutinify');
const connection = require('./connection');

class UsersToMovies {
    constructor() {
        return co(this);
    }
}

module.exports = new UsersToMovies();