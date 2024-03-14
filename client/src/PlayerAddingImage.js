// import io from 'socket.io-client';
import { printResultPage } from './printResultPage';

export function playersAddingImage (roomInput, usersWithName, uncoloredGrid, image) {


let players = usersWithName.map(user => user.userName)
    
        let sendImage = {
            playersName: players,
            roomId: roomInput,
            gridImage: uncoloredGrid
         }

         if (usersWithName.length === 4) {
            
            fetch("http://localhost:3000/images/add", {
                method: "POST",
               headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(sendImage)
            })
            .then(res => res.json())
            .then(data => {
               printResultPage(data, roomInput, image, uncoloredGrid)
            });
        }
   

}