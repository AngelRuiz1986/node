const passport = require('passport');
const Users = require('../models/Users');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
    usernameField:'email',
}, async (email, password, done ) => {
 
    const user = await Users.findOne({email: email});
    if (!user){
        return done(null, false, {message: 'Not User Found'})
    }else{
        const match = await user.matchPassword(password);
        if (match)
            return done(null, user);
        else
            return done(null, false, {message: 'Incorrect Password'})

    }
}))

passport.serializeUser((user, done)=>{
    done(null, user.id)
})

passport.deserializeUser(function(id, done) { //Here you retrieve all the info of the user from the session storage using the user id stored in the session earlier using serialize user.
    Users.findById(id, function(err, user) {
      done(err, user);
    });
});