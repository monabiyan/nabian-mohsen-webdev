/**
 * Created by mohsennabian on 10/31/16.
 */
module.exports = function(app,model) {



    var passport      = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    var bcrypt = require("bcrypt-nodejs");
    var FacebookStrategy = require('passport-facebook').Strategy;
    // var LocalStrategy = require('passport-local').Strategy;

    // var users = [
    //
    // {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
    // {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
    // {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
    // {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    //
    // ];

    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);
    app.post  ('/api/login', passport.authenticate('local'), login);  ///for passport login
    app.post('/api/logout', logout);     //// for passport logout
    app.post ('/api/register', register); //// for passport register
    app.get ('/api/loggedin', loggedin);





/////////////////////////////////  Passport section Started







    passport.serializeUser(serializeUser);


    function serializeUser(user, done) {
        done(null, user);
    }




    passport.deserializeUser(deserializeUser);


    function deserializeUser(user, done) {
        model.userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }



    passport.use(new LocalStrategy(localStrategy));


    function localStrategy(username, password, done) {


        model.userModel
            .findUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            );
    }

    function login(req, res) {

        var user = req.user;

        //////////////////  Decrypt Start
        // if(user && bcrypt.compareSync(password, user.password)) {
        //     return done(null, user);
        // } else {
        //     return done(null, false);
        // }
        //////////////////  Decrypt Finish

        res.json(user);

    }



    function logout(req, res) {
        req.logOut();
        res.send(200);
    }

    function register (req, res) {
        var user = req.body;
        /////////////////////////// ENCRYPT
        // user.password = bcrypt.hashSync(user.password);

        return model.userModel
            .createUser(user)
            .then(
                function(user){
                    if(user){
                        req.login(user, function(err) {
                            if(err) {
                                res.status(400).send(err);
                            } else {
                                res.json(user);
                            }
                        });
                    }
                }
        );
    }

    function loggedin(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }




    app.get ('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/#/user',
            failureRedirect: '/#/login'
        }));

    var facebookConfig = {
        clientID     : "260584714356427",
        clientSecret : "582392369aaf1e9a024cac1b077812f9",
        callbackURL  : "http://localhost:3000/auth/facebook/callback"
    };
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


    function facebookStrategy(token, refreshToken, profile, done) {
        model.userModel
            .findUserByFacebookId(profile.id)}

/////////////////////////////////  Passport section Finished





    function findUser(req,res){
    var params = req.params;
    var query = req.query;
    if(query.password && query.username) {
        findUserByCredentials(req, res);
        }
        else if(query.username) {
        findUserByUsername(req, res);
        }
    }


    function findUserByUsername(req,res)
    {
        var username = req.query.username;
        model
            .userModel
            .findUserByUsername(username)
            .then(
                function(user){
                    if(user){
                        res.json(user);
                    }
                    else {
                        res.send('0');
                    }
                }
            );

    }

    function findUserByCredentials(req,res)
    {
        var username = req.query.username;
        var password = req.query.password;
        model
            .userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    if(user) {
                        res.json(user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }



    function findUserById(req,res)
    {
        var userId = req.params.uid;
        model
            .userModel
            .findUserById(userId)
            .then(
                function (user) {
                    if(user) {
                        res.send(user);
                    } else {
                        res.send('0');
                    }
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            )
    }



    function createUser(req,res){
        var user = req.body;
        console.log(user);
        // user._id = (new Date()).getTime();
        // users.push(user);


        model
            .userModel
            .createUser(user)
            .then(
                function(newUser) {
                    res.send(newUser);
                },

                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function updateUser(req,res){
        var user = req.body;
        var uid = req.params.uid;
        console.log(uid);

        model
            .userModel
            .updateUser(uid, user)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function deleteUser(req,res)
    {
        var uid=req.params.uid;
        model.userModel.removeUser(uid).then(function(user){res.send(user);});
    }

};