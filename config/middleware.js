var passport = require('passport')
    , GitHubStrategy = require('passport-github').Strategy
    , GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;


var verifyHandler = function (token, tokenSecret, profile, done) {
    process.nextTick(function () {
        //console.dir(profile);

      /*  User.findOrCreate({ uid:  profile.id,
        					name: profile.displayName,
        					email:profile.emails.value}).done(function (err, user) {
        						console.log("user creado ou found");
        						console.dir(user);
        						return done(err, user);
        					});*/

        User.findOne({uid: profile.id, provider: profile.provider},function (err, user) {
            if (user) {
                return done(null, user);
            } else {
            	var name = "User"+ Math.floor(Math.random() * 11111);

            	if(profile.displayName != "") name = profile.displayName;
                var shortId = require('shortid'); 
                var url = shortId.generate();
                User.create({
                    provider: profile.provider,
                    uid: profile.id,
                    name: name,
                    email: profile._json.email,
                    imagem: profile._json.picture,
                    url: url
                },function (err, user) {
                        return done(err, user);
                    });
            }
        });
    });
};

passport.serializeUser(function (user, done) {
    done(null, user.id);
    //done(null, user);
});

passport.deserializeUser(function (id, done) {
    User.findOne({id: id}).done(function (err, user) {
        done(err, user);
    });
	//done(null, uid);
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