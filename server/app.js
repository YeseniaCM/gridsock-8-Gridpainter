var express = require('express');
const app = require('express')();
const server = require('http').createServer(app)
const logger = require('morgan');
const cors = require('cors');
const { randomUUID } = require('crypto');

const connection = require('./lib/conn.js');

connection.connect(function(err){
    if(err) throw err
    else console.log("Uppkopplad till databasen");
  })


const io = require('socket.io')(server, {
    cors: {
        origin:'*',
        methods: ['GET', ' POST']
    }
})

const usersRouter = require('./routes/users.js');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use('/users', usersRouter);

app.get('/', (req, res) => {
    res.send('detta funkar')
})

io.on('connection', function(socket) {
    console.log("Användare kopplad");
    //let connectedUsers = Object.keys(io.sockets.clients()).length
    console.log('connectesuser', socket.client.conn.server.clientsCount)
  
// players
    socket.emit('player', socket.id)

    socket.on('playingplayer', (playerData) => {
        console.log('server playerdata', playerData)
    })






    //chat
    socket.emit("chat", "hello world")

    socket.on("chat", (arg) =>{
        console.log("kommande chat", arg);
        io.emit("chat", arg);
    })



    socket.on("disconnect", function () {
        console.log("Användare frånkopplad");
    })
})
server.listen(process.env.PORT || '3000');