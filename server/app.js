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
let userClickCount = 0;
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
    let playersName = req.body.playersName; 
    let gridImage = JSON.stringify(req.body.gridImage); 
    
    let sql = "INSERT INTO images (imageId, roomId, gridImage, playersName) VALUES (?, ?, ?, ?)";
    let values = [imageId, roomId, gridImage, playersName];

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

// image 5
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


// mainarray containing 5 arrays
let originalImages = [image1, image2, image3, image4, image5];



io.on('connection', function(socket) {
    console.log("Användare kopplad");


    socket.on('userName', (username) =>{ 
        userNames[socket.id] = username;
      });


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
            return { socketId, userName: userNames[socketId]}
        })
       
        
        io.in(room).emit('playerConnected', usersWithName)
    }
    
    const randomizeImage = (room) => {
        
        let image = originalImages[Math.floor(Math.random()*originalImages.length)];
        console.log("Här är vår image", image);

        io.to(room).emit('randomImage', image)

    }
    
    socket.on('room', (room) => {

        socket.join(room)
        socket.emit('joinedroom', room)

        updateConnectedUser(room)
        randomizeImage(room)
        

    });

  
    socket.on('chosenRoom', (chosenRoom) => {

        let usersInRoom =  io.sockets.adapter.rooms.get(chosenRoom)
        if(!usersInRoom){
            return;
        } else if ( usersInRoom.size > 4 ) {
            console.log('full')
           socket.emit('check', 'Room is full')
           socket.disconnect(true)
        } else {
            return;
        }
    })



//dissconnect

    socket.on('disconnecting', () => {

        const rooms = Object.keys(socket.rooms);

        rooms.forEach((room) => {
            updateConnectedUser(room)
        })
    })

    
    //chat

        //socket.emit("chat", {userName: '  ', message: 'Start gridpainting'})

        socket.on("chat", (arg) =>{

        console.log("kommande chat", arg);
        console.log('rooms', Object.keys(socket.rooms))
        
        let room = arg.room
        io.in(room).emit("chat", arg)
        })
    
    //grid

    socket.on("gridCellClicked", (arg) => {
        
        console.log("färg uppdaterad", arg);
        
        io.emit("updatePaintGrid", arg);
    })

    //finish button
    socket.on('finishBtnClicked', () => {
        userClickCount = (userClickCount % 4) + 1 ;

        io.emit('updateClickCount', userClickCount);

        if (userClickCount === 4) {
            io.emit('changeBackgroundColor');
        }
    })

    socket.on("disconnect", function () {
        console.log("Användare frånkopplad");
        
    })
})
server.listen(process.env.PORT || '3000');