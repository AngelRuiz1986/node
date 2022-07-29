const mongose = require('mongoose');

mongose.connect('mongodb://localhost/notes-db-app-2',{})
.then(db => console.log('DB is connected'))
.catch(err => console.error(err));