const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: "http/localhost:3005/auth/github/callback",
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ githubId: profile.id }, (err, user) => {
      return done(err, user);
    });
  }
));