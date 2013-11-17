var passport = require('passport')
    , GitHubStrategy = require('passport-github').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var verifyHandler = function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
        console.dir(profile);
        return done(null, profile);
        /*User.findOne({uid: profile.id}).done(function (err, user) {
            if (user) {
                return done(null, user);
            } else {
                User.create({
                    provider: profile.provider,
                    uid: profile.id,
                    name: profile.displayName
                }).done(function (err, user) {
                        return done(err, user);
                    });
            }
        });*/
    });
};

passport.serializeUser(function (user, done) {
    //done(null, user.uid);
    done(null, user);
});

passport.deserializeUser(function (uid, done) {
    /*User.findOne({uid: uid}).done(function (err, user) {
        done(err, user)
    });*/
done(null, uid);
});


module.exports = {

    // Init custom express middleware
    express: {
        customMiddleware: function (app) {

            passport.use(new GitHubStrategy({
                    clientID: "eb7f477d437f54529d7b",
                    clientSecret: "7d9ef2c37fff70fd6056250c0364d6c87e6ba5c3",
                    callbackURL: "http://localhost:1337/auth/github/callback"
                },
                verifyHandler
            ));

            passport.use(new GoogleStrategy({
                    clientID: '740383275630-4cme4abgmkdcn7surcb35bea9iq9emv0.apps.googleusercontent.com',
                    clientSecret: 'dsYfNik7wJAuGMzJnyiOXkDU',
                    callbackURL: 'http://localhost:1337/auth/google/callback'
                },
                verifyHandler
            ));

            app.use(passport.initialize());
            app.use(passport.session());
        }
    }

};