const co = require('coroutinify');
const connection = require('./connection');

class Session {
    constructor() {
        return co(this);
    }

    *getSessions () {
        let rows = yield connection.queryAsync(`SELECT Session.*, Movie.Title, Hall.HallName 
        FROM Session
        INNER JOIN Movie ON Session.MovieID=Movie.MovieID
        INNER JOIN Hall ON Session.HallID=Hall.HallID`);
        return rows;
    }

    *getSessionById (id) {
        let rows = yield connection.queryAsync(`SELECT Session.*, Movie.Title, Hall.HallName 
        FROM Session
        INNER JOIN Movie ON Session.MovieID=Movie.MovieID
        INNER JOIN Hall ON Session.HallID=Hall.HallID
        WHERE Session.SessionID=${id}`);
        return rows[0];
    }

    *getAllSessionsOfMovie(movieId) {
        let rows = yield connection.queryAsync(`SELECT Session.*, Movie.Title, Hall.HallName 
        FROM Session
        INNER JOIN Movie ON Session.MovieID=Movie.MovieID
        INNER JOIN Hall ON Session.HallID=Hall.HallID
        WHERE Session.MovieID=${movieId}`);
        return rows;
    }

    *getSessionsByDate(date) {
        let rows = yield connection.queryAsync(`SELECT
            * FROM Session WHERE DateTime=${date}`);
        return rows;
    }

    *getSessionsByMovieTitle(title) {
        let rows = yield connection.queryAsync(`SELECT Session.*, Movie.Title, Hall.HallName 
        FROM Session
        INNER JOIN Movie ON Session.MovieID=Movie.MovieID
        INNER JOIN Hall ON Session.HallID=Hall.HallID
        WHERE Movie.Title="${title}"`);
        return rows;
    }

}



module.exports = new Session();