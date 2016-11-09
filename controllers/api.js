const moviesDao = require('../dao/movies');

class Api {
    handle (app) {
        this.app = app;
        app.get('/api/user', this.getDefaultUser);
        app.get('/api/movies', this.getMovie);
        app.get('/test', function(req, res) {
            res.sendfile('public/index.html')
        });
    }



    getDefaultUser(req, res, next) {
        res.send({
            name: 'Hasmik',
            age: 21
        });
    }

    getMovie(req, res, next) {
        moviesDao.getMovie((err, movie) => {
            res.send(movie);
        });
    }
}

module.exports = new Api();