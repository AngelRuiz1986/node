const passport = require('passport');
const Users = require('../../../core-test-2/src/models/Users');
const User = require('../app/user/user.model');
var LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {

    const user = await User.findOne({email: email})

    if (user){

        //TODO: check password
        const match = false

        if (match)
            return done(null, user);
        else
            return done(null, false, {message: 'Passwords do not match'})

    }else{
        return done(null, false, {message: 'Not user found'})
    }
}
));

passport.serializeUser((user, done) =>{
    done(null, user.id)
})

passport.deserializeUser(function(id, done){
    Users.findById(id, function(err, user){
        done(err, user)
    })
})