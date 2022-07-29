const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');


const app = express();
require('./database/index')
require('./config/passport');


app.set('port', 3000);
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret:'AKAJ**/Daaksjdalksj12093812kjelk*/',
    resave: true,
    saveUninitialized: true
}));




app.use(passport.initialize());
app.use(passport.session());

console.log(1)
//Routes
app.use(require('./app/user/user.routes'))
app.use(require('./app/notes/notes.routes'));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function(req, res) {
    console.log('in')
    res.send('hello world');
});

app.listen(app.get('port'), function(){
    console.log("Server is running", app.get('port'));
})