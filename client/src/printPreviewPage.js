import { paintAndPrintImage } from "./originalImages.js";
import { homepageDiv } from "./printHomePage.js";
import { instructionsDivText } from "./printWaitingForPlayers";
import { gridDiv, printPaintOnGrid } from './printPaintOnGrid.js'
import { printchat } from './startGameBtn.js'
import io from 'socket.io-client';


export let headingStartGameDiv = document.createElement('div');



export function printPreviewPage(roomInput, usersWithName, image){



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


    countdownFrom(headingStartGameTime, roomInput, usersWithName, image)
    

}


let timerContainer = document.createElement('div');
timerContainer.classList.add('timerContainer');

let timer = document.createElement('p');
timer.classList.add('timer');
;


function countdownFrom(headingStartGameTime, roomInput, usersWithName, image) {
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

            printPaintOnGrid(roomInput, usersWithName, image)
            //printchat(roomInput)
            
            if (usersWithName.length === 4) {
                socket.emit('timer', { room: roomInput, message: 'start timer' });
            }
            timerContainer.appendChild(timer);
            app.appendChild(timerContainer);

        }
    }
    updateCount();
}

export function updateTimer(time){

        if (!timerContainer) {
            timer.textContent = `${time.room}: ${time.minutes}:${time.seconds}`
        } else {
         
            timer.textContent = `${time.room}: ${time.minutes}:${time.seconds}`;
        }   
    
  } 

