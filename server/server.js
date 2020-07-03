
const express = require('express')
var socket = require('socket.io')
const {ExpressPeerServer} = require('peer')
var cors = require('cors')
const app = express()
const port = 3001
app.use(cors())

app.get('/', (req, res) => res.send('Hello World!'))

var server =app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))


var io= socket(server);

io.on('connection',function(socket){
    console.log("connected to socket");
    socket.on("message",data=>{
        console.log(data.user,data.message);
        io.emit("newmessage",data);
    })
})


const peerServer = ExpressPeerServer(server, {
    path: '/myapp'
  });
  
  app.use('/peerjs', peerServer);