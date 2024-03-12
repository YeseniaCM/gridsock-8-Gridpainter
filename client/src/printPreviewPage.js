import { paintAndPrintImage } from "./originalImages.js";
import { homepageDiv } from "./printHomePage.js";
import { instructionsDivText } from "./printWaitingForPlayers";
import { gridDiv, printPaintOnGrid } from './printPaintOnGrid.js'
import { printchat } from './startGameBtn.js'


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

function countdownFrom(headingStartGameTime, roomInput, usersWithName, image) {


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
            printchat(roomInput)

            console.log("Countdown finished!"); 
        }
    }
    
    updateCount()
   
}