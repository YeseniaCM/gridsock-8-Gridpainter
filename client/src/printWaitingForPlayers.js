import io from 'socket.io-client';
import { logOutBtn } from "./printLogoutBtn";
import { gsap } from 'gsap'
import { homepageDiv } from './printHomePage';

export let instructionsDivText = document.createElement('div');
instructionsDivText.setAttribute('class', 'instructions-div-text');

export function printWaitingForPlayers(roomInput) {
  
     app.innerHTML = '';
     homepageDiv.innerHTML = '';
     instructionsDivText.innerHTML= '';
 
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
     instructionRight.textContent = 'Players joined: '; // ${user} ska in och hur många spelare som man väntar på
     
     let colorAssigned = document.createElement('p');
     colorAssigned.textContent = `Your assigned colour is: "userColor"`;
 
     let waitingTime = document.createElement('p');
     waitingTime.textContent = `you have waited in 00:00`;

     let loadingAnimation = document.createElement('div');
     loadingAnimation.setAttribute('class', 'loading-div')

     let loadingAnimation2 = document.createElement('div');
     loadingAnimation2.setAttribute('class', 'loading-div')

     let loadingAnimation3 = document.createElement('div');
     loadingAnimation3.setAttribute('class', 'loading-div')
    animateLoading(loadingAnimation, loadingAnimation2, loadingAnimation3)
 
     let waitingUserFrom = document.createElement('div');
     waitingUserFrom.setAttribute('class', 'waiting-user-form');
     waitingUserFrom.appendChild(colorAssigned); 

 
     let circleDiv = document.createElement('div');
     circleDiv.setAttribute('class', 'circle-div instructionsCircle');
 
     /*
       Funktionen för när alla 4 spelare har klickat på knappen
       Star-Game så kommer man vidare till Preview Image-sidan
     */

     logOutBtn()
     instructionsDivText.append( instructionHeading, instructionLeft,instructionRight, waitingUserFrom, circleDiv)
     app.append(instructionsDivText, loadingAnimation, loadingAnimation2, loadingAnimation3)
     playersWaiting(instructionRight, roomInput)
}





function playersWaiting(instructionsRight, roomInput){
  const socket = io('http://localhost:3000');
  const user = JSON.parse(localStorage.getItem('user'))
  let singleUser = user.find(user => user.userId)


  fetch('http://localhost:3000/users/' + singleUser.userId)
  .then(res => res.json())
  .then(data => {
    data.map(user => {
      let username = user.userName

      socket.emit('userName', username)
        
      socket.emit('room', roomInput)
        socket.on('joinedroom',(roomArg) => {
          
        })

        socket.on('playerConnected', (usersWithName) => {
          instructionsRight.textContent = `Room: ${roomInput}, Connected users:`
          usersWithName.map(user => {
          
            instructionsRight.textContent += `${user.userName}, `
            // check if 4 is connected and start game
            if(usersWithName.length === 4){
              // starta spelet!!
              console.log('start game');
            }
         })
        })
    })
  })
}

function animateLoading(loadingAnimation, loadingAnimation2, loadingAnimation3){
  gsap.to(loadingAnimation, {
    x: 200, // Move to the righ
    duration: 3,
    ease: "power1.inOut",
    repeat: -1, // Repeat the animation infinitely
    yoyo: true, // Apply yoyo effect
  });

  gsap.to(loadingAnimation2, {
    x: 200,
    duration: 4,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,

  });

  gsap.to(loadingAnimation3, {
    x: 200,
    duration:3.5,
    ease: "power1.inOut",
    repeat: -1,
    yoyo: true,
  });
}