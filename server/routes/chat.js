var express = require('express');
const router = express.Router();
const cors = require('cors')()

const server = require("http").createServer(express);
const io = require('socket.io')(server, {
    cors: {
        origin:'*',
        methods: ['GET', ' POST']
    }
})

io.on('connection', function(socket) {
    console.log("Användare kopplad");

    socket.emit("chat", "hello world")

    socket.on("chat", (arg) =>{
        console.log("kommande chat", arg);
        io.emit("chat", arg);
    })

    socket.on("disconnect", function () {
        console.log("Användare frånkopplad");
    })
})

server.listen(3001);
module.exports = router;