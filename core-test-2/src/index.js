const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override')
const session = require('express-session')
const flahs   = require('connect-flash');
const passport = require('passport');

//Initializations
const app = express();
require('./database');
require('./config/passport');

//Settings
app.set('port',3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs.engine({
    defaultLayout: 'main', //Default template
    layoutsDir: path.join(app.get('views'), 'layouts'), // Default layout name
    partialsDir: path.join(app.get('views'), 'partials'), // Partial layout views
    extname: '.hbs',
}))
app.set('view engine', '.hbs'); //Configure view motors

//Middlewares
app.use(express.urlencoded({extended: false}));
//Form send other type methods
app.use(methodOverride('_method')); 
//save sessions in the server
app.use(session({
    secret:'AKAJ**/Daaksjdalksj12093812kjelk*/',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flahs());

//Global Variables
app.use((req, res, next) =>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    next();
})



//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')))


//Server Running
app.listen(app.get('port'), () => {
    console.log("Server is Running", app.get('port'))
})