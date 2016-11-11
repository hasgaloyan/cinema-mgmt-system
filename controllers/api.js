const moviesDao = require('../dao/movies');
const actorsDao = require('../dao/actors');

class Api {
    handle (app) {
        this.app = app;
        app.get('/api/user', this.getDefaultUser);
        app.get('/api/actors', this.getActors);
        app.get('/api/movies', this.getMovies);
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

    getActors(req, res, next) {
        actorsDao.getActors().then((actors) => {
            res.send(actors);
        }).catch((err) => {
            res.status(500).send({ error: err });
        });
    }

    getMovies(req, res, next) {
        moviesDao.getMovies().then((movies) => {
            res.send(movies);
        }).catch((err) => {
            res.status(500).send({ error: err });
        });
    }
}

module.exports = new Api();
