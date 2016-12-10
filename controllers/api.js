const moviesDao = require('../dao/movie');
const actorsDao = require('../dao/actor');
const sessionsDao = require('../dao/session');
const usersDao = require('../dao/users');
const bodyParser = require('body-parser');
const session = require('client-sessions');



class Api {
    handle (app) {
        this.app = app;

        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());

        app.use(session({
            cookieName: 'session',
            secret: 'kskjagsfkjhsgfkh',
            duration: 7 * 24 * 60 * 60 * 1000
        }));

        //showData operations
        app.get('/api/user', this.getDefaultUser);
        app.get('/api/actors', this.getActors);
        app.get('/api/movies', this.getMovies);

        //search operations
        app.get('/api/actors/:id([\\d]+)', this.getActor);
        app.get('/api/actors/:name([\\w]+)', this.getActorsByName);
        app.get('/api/actors/search', this.searchActor);
        app.get('/api/movies/:name([\\w]+)', this.searchMovie);

        //authentication
        app.post('/api/users', this.signIn);
        app.get('/api/profile', this.getProfile);
        app.get('/api/logout', this.logout);


        //Session related
        app.get('/api/sessions', this.getSessions);
        app.get('/api/sessions/:id([\\d]+)', this.getSessionById);
        app.get('/api/movies/:id([\\d]+)/sessions', this.getAllSessionsOfMovieById);
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
        console.log(req);
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


    searchMovie(req, res, next) {

        let promise = moviesDao.getMovieByTitle(req.params.name);

        promise.then((movies) => {
            res.send(movies);
        }).catch((err) => {
            res.status(500).send({error: err});
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

    getSessions(req, res, next) {
        let promise;
        if(req.query.title) {
            promise = sessionsDao.getSessionsByMovieTitle(req.query.title);
        } else {
            promise = sessionsDao.getSessions();
        }
        promise.then((sessions) => {
            res.send(sessions);
        }).catch((err) => {
            res.status(500).send({ error: err });
        });
    }

    getSessionById(req, res, next) {
        sessionsDao.getSessionById(req.params.id).then((session) => {
            res.send(session);
        }).catch((err) => {
            res.status(500).send({ error: err });
        });
    }

    getAllSessionsOfMovieById(req, res, next) {
        sessionsDao.getAllSessionsOfMovie(req.params.id).then((session) => {
            res.send(session);
        }).catch((err) => {
            res.status(500).send({ error: err });
        });
    }

    signIn(req, res, next){
        let args = req.body;
        req.session.user = args.password;
        usersDao.signIn(args).then((user) => {
            let userInfo = {
                name: user[0].FirstName,
                lastName: user[0].LastName
            };
            res.send(userInfo);
        }).catch((err) => {
            res.status(500).send({ error: err });
        });
    }

    getProfile(req, res, next){
        usersDao.getProfile().then((profile) => {

            var data = null;

            profile.forEach((item) => {
                if(item.UserPassword == req.session.user){
                    let userInfo = {
                        name: item.FirstName,
                        lastName: item.LastName
                    };
                    data = userInfo;
                }else{
                    data = 401;
                }
            });

            res.send(data);

        }).catch((err) => {
            res.status(401).send({ error: err });
        })
    }

    logout(req, res, next) {
        req.session.reset();
        console.log('session destroyed');
        res.status(200).send({message: "logged out"});
    }

}

module.exports = new Api();