// import io from 'socket.io-client';
import { printResultPage } from './printResultPage';

export function playersAddingImage (roomInput, usersWithName, uncoloredGrid, image) {
    // const socket = io('http://localhost:3000');

let players = usersWithName.map(user => user.userName)
    
        let sendImage = {
            playersName: players,
            roomId: roomInput,
            gridImage: uncoloredGrid
         }

        // // console.log('sendImage', sendImage);

         fetch("http://localhost:3000/images/add", {
             method: "POST",
            headers: {
                 "Content-Type": "application/json"
             },
             body: JSON.stringify(sendImage)
         })
         .then(res => res.json())
         .then(data => {
            printResultPage(data, roomInput, image)
         });


   

    // socket.on('chosenRoom', (chosenRoom) => {
    //     console.log('chosenRoom', chosenRoom);
    // })

    // socket.on('joinedroom',(roomArg) => {
    //     console.log(roomArg);
    //   })
    // socket.on('playerConnected', (usersWithName) => {
    //     console.log('userName', usersWithName);
          
    //     })

    // socket.on('roomUsers', (usersInRoom) => {
    //     console.log('Användare i rummet:', usersInRoom);
    // });

    // socket.on('joinedroom', (room) => {
    //     const usersInRoom = getUsersInRoom(room);
    //     console.log('roominput', usersInRoom)
    // });
}