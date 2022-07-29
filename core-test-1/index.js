
const express = require('express');
const app = express();

function logger(req, res, next){
    console.log('Request received');
    next();
}


app.use(express.json());
app.use(logger)


app.all('/user', (req, res, next) =>{
    console.log('Index');
    next();
});

app.get('/', function (req, res){
    res.send('Hello world');
});

app.get('/about', function (req, res){
    res.send('About Me 3');
});

app.post('/user/:id', function (req, res){
    console.log(req.body);
    console.log(req.params);
    res.send('POST REQUEST RECEIVED');
});

app.listen(3000, () => {
    console.log("Hello");
});