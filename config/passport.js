var LocalStrategy    = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var TwitterStrategy  = require('passport-twitter').Strategy;
var GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;

var Client           = require('../models/client');

var configAuth       = require('./auth.js');

module.exports = function(passport) {


    passport.serializeUser(function(client, done) {
        done(null, client.id);
    });

    passport.deserializeUser(function(id, done) {
        Client.findById(id, function(err, client) {
            done(err, client);
        });
    });


    // LOCAL SIGNUP



    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) {

            process.nextTick(function() {


                Client.findOne({ 'local.email' :  email }, function(err, client) {
                    if (err)
                        return done(err);

                    // check to see if theres already a user with that email
                    if (client) {
                        return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                    } else {

                        var newClient            = new Client();

                        newClient.local.email    = email;
                        newClient.local.password = newClient.generateHash(password);

                        // save the user
                        newClient.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newClient);
                        });
                    }

                });

            });

        }));


    passport.use('local-login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, email, password, done) { // callback with email and password from our form


            Client.findOne({ 'local.email' :  email }, function(err, client) {
                if (err)
                    return done(err);

                if (!client)
                    return done(null, false, req.flash('loginMessage', 'No client found.Redirect to register...')); // req.flash is the way to set flashdata using connect-flash

                if (!client.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                return done(null, client);
            });

        }));


//FACEBOOK

    passport.use(new FacebookStrategy({

            clientID        : configAuth.facebookAuth.clientID,
            clientSecret    : configAuth.facebookAuth.clientSecret,
            callbackURL     : configAuth.facebookAuth.callbackURL

        },


        function(token, refreshToken, profile, done) {

            process.nextTick(function() {


                Client.findOne({ 'facebook.id' : profile.id }, function(err, client) {


                    if (err)
                        return done(err);

                    if (client) {
                        return done(null, client);
                    } else {
                        var newClient            = new Client();

                        newClient.facebook.id    = profile.id; // set the users facebook id
                        newClient.facebook.token = token; // we will save the token that facebook provides to the user
                        newClient.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
                        /*newClient.facebook.email = profile.emails.value;*/ // facebook can return multiple emails so we'll take the first

                        newClient.save(function(err) {
                            if (err)
                                throw err;

                            // if successful, return the new user
                            return done(null, newClient);
                        });
                    }

                });
            });

        }));

//TWITTER
    passport.use(new TwitterStrategy({

            consumerKey     : configAuth.twitterAuth.consumerKey,
            consumerSecret  : configAuth.twitterAuth.consumerSecret,
            callbackURL     : configAuth.twitterAuth.callbackURL

        },
        function(token, tokenSecret, profile, done) {


            process.nextTick(function() {

                Client.findOne({ 'twitter.id' : profile.id }, function(err, client) {


                    if (err)
                        return done(err);

                    if (client) {
                        return done(null, client); // user found, return that user
                    } else {
                        var newClient                 = new Client();

                        newClient.twitter.id          = profile.id;
                        newClient.twitter.token       = token;
                        newClient.twitter.username    = profile.username;
                        newClient.twitter.displayName = profile.displayName;

                        newClient.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newClient);
                        });
                    }
                });

            });

        }));


    // GOOGLE
    passport.use(new GoogleStrategy({

            clientID        : configAuth.googleAuth.clientID,
            clientSecret    : configAuth.googleAuth.clientSecret,
            callbackURL     : configAuth.googleAuth.callbackURL

        },
        function(token, refreshToken, profile, done) {


            process.nextTick(function() {

                Client.findOne({ 'google.id' : profile.id }, function(err, client) {
                    if (err)
                        return done(err);

                    if (client) {

                        return done(null, client);
                    } else {
                        var newClient          = new Client();

                        newClient.google.id    = profile.id;
                        newClient.google.token = token;
                        newClient.google.name  = profile.displayName;
                        newClient.google.email = profile.emails[0].value; // pull the first email

                        newClient.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newClient);
                        });
                    }
                });
            });

        }));


};




