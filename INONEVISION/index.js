const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config()

const app = express();

// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//BD
mongoose.connect('mongodb://localhost:27017/invisionOne', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

//ROUTES
const authRoutes = require('./src/routes/auth');
const permissions = require('./src/routes/Permissions');

//const checkActionsRoutes = require('./src/routes/roles');
//const verify = require('./src/middleware/jwt');


// route middlewares
app.use('/api/user',  authRoutes);
app.use('/api/permissions',  permissions);


//app.use('/api/roles', [verify.token, verify.permissions], checkActionsRoutes);


app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})