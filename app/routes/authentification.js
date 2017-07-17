var express    = require('express');
var router = express.Router();

module.exports = function(passport) {

    router.get('/', function(req, res) {
        res.render('index.ejs');
    });

    router.get('/login', function(req, res) {

        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    router.post('/login', passport.authenticate('local-login', {
        successRedirect : '/api/auth/profile',
        failureRedirect : '/api/auth/login',
        failureFlash : true
    }));


    router.get('/signup', function(req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    router.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/api/auth/profile',
        failureRedirect : '/api/auth/login',
        failureFlash : true
    }));



    router.get('/profile', isLoggedIn, function(req, res) {
        res.render('profile.ejs', {
            user : req.user
        });
    });


    router.get('/facebook', passport.authenticate('facebook', { scope : 'email' }));
    router.get('/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect : '/api/auth/profile',
            failureRedirect : '/'
        }));




    // TWITTER ROUTES

    router.get('/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    router.get('/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect : '/api/auth/profile',
            failureRedirect : '/'
        }));



    // GOOGLE ROUTES
    router.get('/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

    router.get('/google/callback',
        passport.authenticate('google', {
            successRedirect : '/api/auth/profile',
            failureRedirect : '/'
        }));



router.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/api/auth');
    });

    return router;
};

function isLoggedIn(req, res, next) {

    if (req.isAuthenticated())
        return next();

    res.redirect('/');
}
