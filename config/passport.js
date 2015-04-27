var LocalStrategy  = require('passport-local').Strategy;

// load up the user model
var MygosunAPI = require('../server/services/mygosunAPI');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(userData, done) {
        UserModel.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use(new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'providerKey',
        passwordField : 'localizer',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, providerKey, localizer, done) {
        MygosunAPI.getAuthToken(providerKey, localizer)
            .then(function(data){
                return done(null, data);
            })
            .catch(function(err){
                console.log(err);
                return done(null, false, { message : 'Incorrect parameters'});
            })

    }));

};
