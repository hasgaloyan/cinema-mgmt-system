const connection = require('./connection');

class Movies {

    getMovie(done) {
        connection.query('SELECT 222 as result', (err, rows, fields) => {
            if(!err || rows) {
                return done(null, {
                    title: 'Prestige',
                    director: 'Christopher Nolan',
                    rows: rows,
                    fields: fields
                });
            }
            return done(err || new Error('Something went wrong!'));
        });
    }
}

module.exports = new Movies();