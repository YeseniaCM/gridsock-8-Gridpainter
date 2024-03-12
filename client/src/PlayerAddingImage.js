import io from 'socket.io-client';

export function playersAddingImage (roomInput, usersWithName) {

    // const socket = io('http://localhost:3000');

    let playersName; 

    usersWithName.forEach(user => {
        console.log('useerss', user.userName);
        playersName = user.userName;
    })
    


        // let sendImage = {
        //     imageId: '',
        //     roomId: roomInput,
        //     playersName: "Skapad bild av:" + usersWithName.map(user => user.userName).join(', ') + ' från rum: ' + roomName,
        //     gridImage: "[[coloredGrid]]"
        // }

        // // console.log('sendImage', sendImage);

        // fetch("http://localhost:3000/images/add", {
        //     method: "POST",
        //     headers: {
        //         "content-Type": "application/json"
        //     },
        //     body: JSON.stringify(sendImage)
        // })
        // .then(res => res.json())
        // .then(data => {
        //     console.log("Adding Image", data);
        // });


   

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