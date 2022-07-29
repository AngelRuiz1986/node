//const op = require('./operations')
//console.log(op.getNombre());

//const fs = require('fs');

/*await fs.writeFile('./Nuevo.txt', 'hola mundo', function(err){
    if (err){
        console.log('Ocurrio un error');
    }
});*/

/*fs.readFile('./nuevo.txt', function(err, content){
    if (!err){
        console.log(content.toString());
    }
});*/

/*const http = require('http')
http.createServer(function(req, res){
    res.write("Servidor NodeJS");
    res.end();
}).listen(3000, function(){
    console.log('Server running')
});*/

/*
const EventEmitter = require('events');
const e = new EventEmitter()
e.on('miEvento', function(args){
    console.log('Escuchado eventos', args)
})
e.emit('miEvento', {
    id: 1,
    msg: 'hola'
});*/

const { response } = require('express');
const express = require('express');
const server  = express();

server.get('/', function (req, res){
    res.send("Express  y Node");
    res.end();
});

server.get('/usuario', function (req, res){
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify([{nombre: 'Luis', id: '17001216'}]));
    //res.status(400).end()
});

names = [{name: 'angel 1', id:1}, {name: 'angel 2', id:2}, {name: 'angel 3', id:3}, {name: 'angel 4', id:4}]

server.delete('/usuario/:id', function (req, res){
    res.setHeader('Content-Type', 'application/json');
    const id = Number(req.params.id);
    const nameFilter = names.filter(e => e.id !== id);
    if (nameFilter)
        res.json(nameFilter)
    else
        res.status(404).end()
});

server.listen(3000, function (){
    console.log('Server Running')
})