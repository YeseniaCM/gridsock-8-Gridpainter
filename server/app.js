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

let connectedUsers = {} // array för connected user
let userNames = {};
let asignColours= {}
let colourCount = 0;
let intervalId;
let userClickCount = 0;


const usersInRoom = new Map();

/* GET all images*/
app.get('/images', function(req, res) {
    connection.connect((err)=> {
      if(err) console.log(err)
    
        let query = `SELECT * FROM images`;
      connection.query(query , (err, result) => {
        if(err) console.log(err)
            
        res.json(result) 
      })
     })
});

/* GET images after iamesId*/
app.get('/images/:imageId', function(req, res) {

    let imageId	= req.params.imageId;

    connection.connect((err)=> {
      if(err) console.log(err)
    
        let query = `SELECT * FROM images WHERE imageId	= ?`;
        let values = [imageId]
      connection.query(query , values, (err, result) => {
        if(err) console.log(err)
            
        res.json(result) 
      })
     })
});

  
// Add new image
app.post('/images/add', function(req, res) {
    let imageId = randomUUID();
    let roomId = req.body.roomId; 
    let playersName = req.body.playersName.toString(); 
    let gridImage = JSON.stringify(req.body.gridImage)
    
    let sql = "INSERT INTO images (roomId, imageId, playersName, gridImage) VALUES (?, ?, ?, ?)";
    let values = [roomId, imageId, playersName, gridImage];

    connection.query(sql, values, (err, data) => {
        if (err) {
            console.log("Error:", err);
            res.status(500).send("Internal Server Error");
            return;
        }

        res.status(201).json({ message: "Image added successfully", imageId: imageId, data: data});
    });
})

let image1 = [
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [4, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4],
    [4, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4],
    [4, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 4],
    [4, 0, 3, 2, 1, 1, 1, 1, 1, 1, 1, 2, 3, 0, 4],
    [4, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 2, 3, 0, 4],
    [4, 0, 3, 2, 1, 0, 4, 0, 4, 0, 1, 2, 3, 0, 4],
    [4, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 2, 3, 0, 4],
    [4, 0, 3, 2, 1, 1, 1, 1, 1, 1, 1, 2, 3, 0, 4],
    [4, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 4],
    [4, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4],
    [4, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
    
];

let image2 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
    [0, 0, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 0, 0],
    [0, 0, 4, 3, 2, 2, 2, 2, 2, 2, 2, 3, 4, 0, 0],
    [0, 0, 4, 3, 2, 1, 1, 1, 1, 1, 2, 3, 4, 0, 0],
    [0, 0, 4, 3, 2, 1, 0, 0, 0, 1, 2, 3, 4, 0, 0],
    [0, 0, 4, 3, 2, 1, 0, 0, 0, 1, 2, 3, 4, 0, 0],
    [0, 0, 4, 3, 2, 1, 0, 0, 0, 1, 2, 3, 4, 0, 0],
    [0, 0, 4, 3, 2, 1, 1, 1, 1, 1, 2, 3, 4, 0, 0],
    [0, 0, 4, 3, 2, 2, 2, 2, 2, 2, 2, 3, 4, 0, 0],
    [0, 0, 4, 3, 3, 3, 3, 3, 3, 3, 3, 3, 4, 0, 0],
    [0, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]

let image3 = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1],
    [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 2, 1],
    [1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 4, 3, 2, 2, 1],
    [1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 4, 3, 2, 2, 1],
    [1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 4, 3, 2, 2, 1],
    [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 2, 1],
    [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
    [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1],
    [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 2, 1],
    [1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 4, 3, 2, 2, 1]
];


let image4 = [
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4],
    [4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4],
    [4, 0, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 0, 4],
    [4, 0, 4, 2, 1, 1, 1, 1, 1, 1, 1, 2, 4, 0, 4],
    [4, 0, 4, 2, 1, 0, 0, 0, 0, 0, 1, 2, 4, 0, 4],
    [4, 0, 4, 2, 1, 0, 3, 0, 3, 0, 1, 2, 4, 0, 4],
    [4, 0, 4, 2, 1, 0, 0, 0, 0, 0, 1, 2, 4, 0, 4],
    [4, 0, 4, 2, 1, 1, 1, 1, 1, 1, 1, 2, 4, 0, 4],
    [4, 0, 4, 2, 2, 2, 2, 2, 2, 2, 2, 2, 4, 0, 4],
    [4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4],
    [4, 0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 0, 4],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
];

let image5 = [
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [4, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4],
    [4, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 4],
    [4, 0, 3, 2, 1, 1, 1, 1, 1, 1, 1, 2, 3, 0, 4],
    [4, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 2, 3, 0, 4],
    [4, 0, 3, 2, 1, 0, 0, 4, 0, 0, 1, 2, 3, 0, 4],
    [4, 0, 3, 2, 1, 0, 0, 0, 0, 0, 1, 2, 3, 0, 4],
    [4, 0, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 0, 4],
    [4, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4],
    [4, 0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0, 4],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [4, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
    [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
];


let originalImages = [image1, image2, image3, image4, image5];

io.on('connection', function(socket) {

    socket.on('userName', (username) =>{ 
        colourCount = (colourCount % 4) + 1;
        userNames[socket.id] = username;
        asignColours[socket.id] = colourCount;
    });

    
// Upadate Connected user
    const updateConnectedUser = (room) => {

        let usersInRoom =  io.sockets.adapter.rooms.get(room)
        
        if ( usersInRoom.size > 4 ) {
           io.emit('check', 'Room is full')
           socket.disconnect(true)
        }
        
        if(usersInRoom) {
            connectedUsers[room] = Array.from(usersInRoom)
        } else {
            connectedUsers[room] = [];
        }

        const usersWithName = connectedUsers[room].map(socketId => {
            return { socketId, userName: userNames[socketId], color: asignColours[socketId]}
        })
       
        io.in(room).emit('playerConnected', usersWithName)
    }
    
    //Random image
    const randomizeImage = (room) => {
        let image = originalImages[Math.floor(Math.random()*originalImages.length)];

        io.to(room).emit('randomImage', image)
    }
    
    //Join room
    socket.on('room', (room) => {
        socket.join(room)
        socket.emit('joinedroom', room)
        updateConnectedUser(room)
        randomizeImage(room)
        
        
        const count = usersInRoom.get(room) || 0;
        usersInRoom.set(room, count + 1);

         if (usersInRoom.get(room) === 4) {
              startTimerForRoom(room);
        }
    });

    //Check if room is full
    socket.on('chosenRoom', (chosenRoom) => {

        let usersInRoom =  io.sockets.adapter.rooms.get(chosenRoom)
        
        if(!usersInRoom){
            return;
        } else if ( usersInRoom.size > 4 ) {
           socket.emit('check', 'Room is full')
           socket.disconnect(true)
        } else {
            return;
        }
    })

    //Timer
    function startTimerForRoom(room) {
        intervalId;

        let distance = 10 * 60 * 1000;
    
            intervalId = setInterval(() => {
            let minutes = Math.floor(distance / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
            if (distance <= 0) {
                clearInterval(intervalId);
                io.in(room).emit('timerExpired', { room: room });
            } else {
                distance -= 1000;
            }

            io.in(room).emit('timerUpdate', { room: room, minutes: minutes, seconds: seconds });
        }, 1000);
        }

    //chat

        socket.on("chat", (arg) =>{    
            let room = arg.room
            io.in(room).emit("chat", arg)
        })
    
    //grid

    socket.on("gridCellClicked", (arg) => {
        io.emit("updatePaintGrid", arg);
    })

    socket.on('assignedColor', (userAssignedColor) => {
        io.emit('assignedColor', (userAssignedColor));
    })

    //finish button
    socket.on('finishBtnClicked', () => {

        userClickCount = (userClickCount % 4) + 1 ;
       
        clearInterval(intervalId);
        intervalId = undefined;

        if (userClickCount === 4) {

            io.emit('changeBackgroundColor');
            clearInterval(intervalId);
            socket.emit('intervalCleared');   
        }   
    })


    //dissconnect
    socket.on('disconnect', () => {
      
        colourCount = 0;
        console.log("Användare frånkopplad");
        const rooms = Object.keys(socket.rooms);
    
        rooms.forEach((room) => {
            socket.leave(room)
            updateConnectedUser(room)
        })
    })
})
server.listen(process.env.PORT || '3000');