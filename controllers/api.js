const moviesDao = require('../dao/movies');

class Api {
    handle (app) {
        this.app = app;
        app.get('/api/user', this.getDefaultUser);
        app.get('/api/movies', this.getMovie);
        app.get('/test', (req, res) => {
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
        moviesDao.getMovie().then((movie) => {
            res.send(movie);
        }).catch((err) => {
            res.status(500).send({ error: err });
        });
    }
}

module.exports = new Api();
