import { paintAndPrintImage } from "./originalImages";

export let headingStartGameDiv = document.createElement('div');

export function printPreviewPage(){
    headingStartGameDiv.setAttribute('class', 'headingStartGameDiv')

    let heading = document.createElement('h1')
    heading.textContent = `Are you ready?`;
    
    let headingStartGameTime = document.createElement('h1')

    headingStartGameDiv.append(heading, headingStartGameTime)
    app.appendChild(headingStartGameDiv);
    paintAndPrintImage()
    // hämta 

    countdownFrom()
    
    
function countdownFrom() {
    let count = 10;
    
    function updateCount() {
        if (count >= 0) {
            headingStartGameTime.textContent = `Game starts in ${count}`;
            count--;
            setTimeout(updateCount, 1000); 
        } else {
            // Ändra till PrintGamePage
            headingStartGameTime.textContent = "Game started!"; 
            console.log("Countdown finished!"); 
        }
    }

    updateCount();
}
}