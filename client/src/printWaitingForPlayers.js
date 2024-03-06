import { logOutBtn } from "./printLogoutBtn";


export let instructionsDivText = document.createElement('div');
instructionsDivText.setAttribute('class', 'instructions-div-text');

export function printWaitingForPlayers () {
     app.innerHTML = '';
 
     let instructionHeading = document.createElement('h1');
     instructionHeading.textContent = 'Waiting for players to join...';
     instructionHeading.setAttribute('class', 'instruction-eading');

     let instructionLeft = document.createElement('p');
     instructionLeft.setAttribute('class', 'instruction-text instructionLeft');
     instructionLeft.textContent = `
     When 4 players has joined the game will start.
      You´ll get a 5 second glimpse of a picture
      Each person will get assigned a colour
      To paint, press the box you want to color
      you all have 10 minutes to complete the task
     `;

     let instructionRight = document.createElement('p');
     instructionRight.setAttribute('class', 'instruction-text instructionRight');
     instructionRight.textContent = `
     User_ has joined.. 
     Waiting for x more playsers
     `; // ${user} ska in och hur många spelare som man väntar på
     
     let colorAssigned = document.createElement('p');
     colorAssigned.textContent = `Your assigned colour is: "userColor"`;
 
     let waitingTime = document.createElement('p');
     waitingTime.textContent = `you have waited in 00:00`;
 
     let waitingUserFrom = document.createElement('div');
     waitingUserFrom.setAttribute('class', 'waiting-user-form');
     waitingUserFrom.appendChild(colorAssigned); 
     waitingUserFrom.appendChild(waitingTime); 
 
     let circleDiv = document.createElement('div');
     circleDiv.setAttribute('class', 'circle-div instructionsCircle');
 
     /*
       Funktionen för när alla 4 spelare har klickat på knappen
       Star-Game så kommer man vidare till Preview Image-sidan
     */

     logOutBtn()
     instructionsDivText.append( instructionHeading, instructionLeft,instructionRight, waitingUserFrom, circleDiv)
     app.appendChild(instructionsDivText)
}





