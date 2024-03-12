import { paintAndPrintImage } from "./originalImages.js";
import { homepageDiv } from "./printHomePage.js";
import { instructionsDivText } from "./printWaitingForPlayers";
import { gridDiv, printPaintOnGrid } from './printPaintOnGrid.js'
import { printchat } from './startGameBtn.js'


export let headingStartGameDiv = document.createElement('div');

export function printPreviewPage(roomInput){

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

    countdownFrom(headingStartGameTime, roomInput)
    

}

function countdownFrom(headingStartGameTime, roomInput) {
    let count = 5;
    
    // const socket = io
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

            // socket.emit('timer', roomInput) // meddelar vi servern att vimern ska starta

            /* där timern ska printas
                socket.on('timerUpdate', (minutes, seconds) => {
                    // do toyr thing
                    //appenda 
                })
            */
        }
    }
    
    updateCount()
   
}