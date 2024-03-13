import { paintAndPrintImage } from "./originalImages.js";
import { homepageDiv } from "./printHomePage.js";
import { instructionsDivText } from "./printWaitingForPlayers";
import { gridDiv, printPaintOnGrid } from './printPaintOnGrid.js'
import { printchat } from './startGameBtn.js'
import io from 'socket.io-client';


export let headingStartGameDiv = document.createElement('div');

export function printPreviewPage(roomInput, usersWithName){

    app.innerHTML = '';
     homepageDiv.innerHTML = '';
     instructionsDivText.innerHTML= '';
    

    headingStartGameDiv.setAttribute('class', 'headingStartGameDiv')

    let heading = document.createElement('h1')
    heading.textContent = `Are you ready?`;
    
    let headingStartGameTime = document.createElement('h1')

    headingStartGameDiv.append(heading, headingStartGameTime)
    app.appendChild(headingStartGameDiv);
    
    // hämta 

    countdownFrom(headingStartGameTime, roomInput, usersWithName)
    

}


function countdownFrom(headingStartGameTime, roomInput, usersWithName) {
    const socket = io('http://localhost:3000');
    
    let count = 5;
    
   
    function updateCount() {
        if (count >= 0) {
            headingStartGameTime.textContent = `Game starts in ${count}`;
            count--;
            setTimeout(updateCount, 1000);
            
        } else {
            headingStartGameDiv.innerHTML = '';
            app.innerHTML = '';
            gridDiv.innerHTML ='';
            printPaintOnGrid()
            printchat()
            console.log("Countdown finished!"); 
            
            
            let timerContainer;
            let timer;
            
            if (usersWithName.length === 4) {
                socket.emit('timer', { room: roomInput, message: 'start timer' });
            }
            
            console.log("is this connected", socket.connected);
            console.log("users with name", usersWithName);
            console.log("which room", roomInput);

            socket.on('timerUpdate', ({ room, minutes, seconds }) => {
                console.log("connected to the server or not?");

              
                if (!timerContainer) {
                    timerContainer = document.createElement('div');
                    timerContainer.classList.add('timerContainer');
            
                    timer = document.createElement('p');
                    timer.classList.add('timer');
                    timer.textContent = `${room}: ${minutes}:${seconds}`;
            
                    timerContainer.appendChild(timer);
                    app.appendChild(timerContainer);
                } else {
                 
                    timer.textContent = `${room}: ${minutes}:${seconds}`;
                }
            });
        }
       
    }

    

 
    
    updateCount();
   
}

