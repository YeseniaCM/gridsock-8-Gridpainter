import { originalImages } from "./originalImages";
import { printWaitingForPlayers } from "./printWaitingForPlayers.js";


export function playersAddingImage (socket, room, usersInRoom) {

    socket.on('roomUsers', (usersInRoom) => {
        console.log('Användare i rummet:', usersInRoom);
        
        });



    socket.on('joinedroom',(room) => {
        const usersInRoom = getUsersInRoom(room);
        console.log('roominput', room)
      })
   
    console.log('användare', socket.username);

   
   
    const user = JSON.parse(localStorage.getItem('user'));
    let users = user.find(user => user.userName)
    console.log('användareee:', users);


    let sendImage = {
        imageId: '',
        playersName: "Skapad bild av lag:" + users,
        roomId: socket.id, 
        gridImage : "[[coloredGrid]]"
    }
    // console.log(playersName);
    fetch("http://localhost:3000/newImages/add", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(sendImage)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Adding Image", data);
            console.log(socket, room, usersInRoom );
        })
}