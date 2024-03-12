import { paintAndPrintImage } from "./originalImages.js";
import { homepageDiv } from "./printHomePage.js";
import { instructionsDivText } from "./printWaitingForPlayers";
import { printPaintOnGrid } from './printPaintOnGrid.js'
import { printchat } from './startGameBtn.js'


export let headingStartGameDiv = document.createElement('div');

export function printPreviewPage(){

    app.innerHTML = '';
     homepageDiv.innerHTML = '';
     instructionsDivText.innerHTML= '';

    headingStartGameDiv.setAttribute('class', 'headingStartGameDiv')

    let heading = document.createElement('h1')
    heading.textContent = `Are you ready?`;
    
    let headingStartGameTime = document.createElement('h1')

    headingStartGameDiv.append(heading, headingStartGameTime)
    app.appendChild(headingStartGameDiv);
    paintAndPrintImage()
    // hämta 

    countdownFrom(headingStartGameTime)
    

}

function countdownFrom(headingStartGameTime) {
    let count = 5;
    
    function updateCount() {
        if (count >= 0) {
            headingStartGameTime.textContent = `Game starts in ${count}`;
            count--;
            setTimeout(updateCount, 1000);
            
        } else {
            headingStartGameDiv.innerHTML = '';
            app.innerHTML = '';
            printPaintOnGrid()
            //printchat()
            console.log("Countdown finished!"); 
        }
    }
    
    updateCount()
   
}