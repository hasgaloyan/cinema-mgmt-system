const moviesDao = require('../dao/movie');
const actorsDao = require('../dao/actor');

class Api {
    handle (app) {
        this.app = app;
        app.get('/api/user', this.getDefaultUser);
        app.get('/api/actors', this.getActors);
        app.get('/api/movies', this.getMovies);
        app.get('/api/actors/name/:name([\\d\\w]+)', this.getActorsByName);
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

    getActorsByName(req, res, next) {
        actorsDao.getActorsByName(req.params.name).then((actors) => {
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
