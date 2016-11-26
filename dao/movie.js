const co = require('coroutinify');
const connection = require('./connection');

class Movie {
    constructor () {
        return co(this);
    }

    *getMovies () {
        let rows = yield connection.queryAsync(`SELECT
            * FROM Movie`);
        return rows;
    }

    *getMovieByTitle(title){
        let movie = connection.queryAsync(`SELECT * From MOVIE as M WHERE 
            M.Title Like %title%`);
        return movie;
    }
}

module.exports = new Movie();
