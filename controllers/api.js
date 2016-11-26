const moviesDao = require('../dao/movie');
const actorsDao = require('../dao/actor');
//const usersDao = require('../dao/users');

class Api {
    handle (app) {
        this.app = app;

        //showData operations
        app.get('/api/user', this.getDefaultUser);
        app.get('/api/actors', this.getActors);
        app.get('/api/movies', this.getMovies);

        //search operations
        app.get('/api/actors/:id([\\d]+)', this.getActor);
        app.get('/api/actors/:name([\\w]+)', this.getActorsByName);
        app.get('/api/actors/search', this.searchActor);
        //app.get('/api/movies/search/:title([\\w]+)', this.searchMovie); //TODO
    }

    getDefaultUser(req, res, next) {
        res.send({
            name: 'Hasmik',
            age: 21
        });
    }

    getActors(req, res, next) {
        console.log(req.body);
        actorsDao.getActors().then((actors) => {
            res.send(actors);
        }).catch((err) => {
            res.status(500).send({ error: err });
        });
    }

    getActor(req, res, next) {
        actorsDao.getActor(req.params.id).then((actor) => {
            res.send(actor);
        }).catch((err) => {
            res.status(404).send({ error:err});
        })
    }

    searchActor(req, res, next) {
        let promise;
        if(req.query.age || (req.query.age_from && req.query.age_to)) {
            let range = [req.query.age || req.query.age_from, req.query.age || req.query.age_to];
            promise = actorsDao.getActorsByAge(range[0], range[1]);

        } else if(req.query.name) {
            let names = req.query.name.split('+');
            let firstName = names[0];
            let lastName = names[1] || '';
            promise = actorsDao.getActorsByName(firstName);
        }
        promise.then((actors) => {
            res.send(actors);
        }).catch((err) => {
            res.status(500).send({error: err});
        });
    }


    ///TODO
    // searchMovie(req, res, next) {
    //
    //     let promise;
    //     if(req.query.title ) {
    //         promise = moviesDao.getMovieByTitle(req.query.title)
    //     }
    //     promise.then((movie) => {
    //         res.send(movie);
    //     }).catch((err) => {
    //         res.status(500).send({error: err});
    //     });
    // }

    getActorsByName(req, res, next) {
        actorsDao.getActorsByName(req.params.name).then((actors) => {
            res.send(actors);
        }).catch((err) => {
            res.status(500).send({ error: err });
        });
    }

    getMovies(req, res, next) {
        moviesDao.getMovies().then((movies) => {
            console.log(movies);
            res.send(movies);
        }).catch((err) => {
            res.status(500).send({ error: err });
        });
    }
}

module.exports = new Api();