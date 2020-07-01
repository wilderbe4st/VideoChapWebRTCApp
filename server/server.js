// var express = require('express')();
// // var http = require('http').createServer(app);



const express = require('express')
var socket = require('socket.io')
const app = express()
const port = 3001

app.get('/', (req, res) => res.send('Hello World!'))

var server =app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


var io= socket(server);

io.on('connection',function(socket){
    console.log("connected to socket");
})