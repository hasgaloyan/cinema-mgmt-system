/**
 * Created by has on 11/12/16.
 * Defines the mapping between the Actor and Movie through "plays in" relationship
 * An Actor can play in many Movies and the Movie can have many Actors playing in it.
 */

const co = require('coroutinify');
const connection = require('./connection');

class ActorsToMovies {
    constructor() {
        return co(this);
    }

    *getCastFromMovie(movieId) {
        let rows = yield  connection.queryAsync(`SELECT 
            A.* FROM MovieToActor as MA WHERE MovieID = ${movieId}
            JOIN Actor as A ON A.ID = MA.ActorID`);
        return rows;
        }
    *getMoviesOfActor(actorId) {
        let rows = yield connection.queryAsync(`SELECT
            * FROM M`)
        }
}


module.exports = new ActorsToMovies();