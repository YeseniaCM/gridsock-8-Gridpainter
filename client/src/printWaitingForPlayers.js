import io from 'socket.io-client';
import { logOutBtn } from "./printLogoutBtn";
import { gsap } from 'gsap'
import { homepageDiv } from './printHomePage';
import { printPreviewPage, updateTimer } from './printPreviewPage';
import { paintAndPrintImage } from './originalImages';
import { updateChatList } from './startGameBtn'
import { printNoTimeLeftPage } from './printNoTimeLeftPage';


export let instructionsDivText = document.createElement('div');
instructionsDivText.setAttribute('class', 'instructions-div-text');

export let colorAssigned = document.createElement('span');
export let userAssignedColor;

export function printWaitingForPlayers(roomInput) {
  
  app.innerHTML = '';
  homepageDiv.innerHTML = '';
  instructionsDivText.innerHTML= '';

  let instructionHeading = document.createElement('h1');
  instructionHeading.textContent = 'Waiting for players to join';
  instructionHeading.setAttribute('class', 'instruction-eading');

  let instructionLeft = document.createElement('p');
  instructionLeft.setAttribute('class', 'instruction-text instructionLeft');
  instructionLeft.textContent = `
  Once 4 players have joined, the game will start.
  You will get a 5 second glimpse of a picture.
  Each person will get assigned a paint, press the box you want to color!
  You will have 10 minutes to complete the task
  `;

  let instructionRight = document.createElement('p');
  instructionRight.setAttribute('class', 'instruction-text instructionRight');
  instructionRight.textContent = 'Players joined: '; // ${user} ska in och hur många spelare som man väntar på

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
  waitingUserFrom.textContent = "players waiting";


  let circleDiv = document.createElement('div');
  circleDiv.setAttribute('class', 'circle-div instructionsCircle');

    
  instructionsDivText.append( instructionHeading, instructionLeft,instructionRight, waitingUserFrom, circleDiv)
  app.append(instructionsDivText, loadingAnimation, loadingAnimation2, loadingAnimation3)
  playersWaiting(instructionRight, roomInput, waitingUserFrom)
}

let colorPool = [1, 2, 3, 4];

function playersWaiting(instructionsRight, roomInput, waitingUserFrom){
  const socket = io('https://gridpainter-ltfli.ondigitalocean.app');
  const user = JSON.parse(localStorage.getItem('user'))
  let singleUser = user.find(user => user.userId)
  

  fetch('https://gridpainter-ltfli.ondigitalocean.app/users/' + singleUser.userId)
  .then(res => res.json())
  .then(data => {
    data.map(user => {
      let username = user.userName

      socket.emit('userName', username)
      socket.emit('room', roomInput)

      socket.on('joinedroom',(roomArg) => {
       // console.log(roomArg);
      })

        
        socket.on('playerConnected', (usersWithName) => {
          console.log('userswith', usersWithName)
          instructionsRight.textContent = `Room: ${roomInput}, Connected users: `
          waitingUserFrom.textContent = "Your assigned color is: "
          

          //assign color to user
          usersWithName.forEach((user) => {

            console.log('user', user)
            instructionsRight.textContent += user.userName;
           
          
            socket.emit('assignedColor', {userName: user.userName, id: user.socketId, userAssignedColor})
            socket.emit('userColor', {userName: user.userName});
            
            
          })
       

          socket.on('randomImage', (image) => {
            // check if 4 is connected and start game

            if(usersWithName.length === 4){
              printPreviewPage(roomInput, usersWithName, image)
              paintAndPrintImage(image)
              socket.on('timerExpired', (time) =>{
                printNoTimeLeftPage()
              })
              console.log('start game');
            }
          })
        })
        socket.on("chat", (arg) => {
          console.log('chatchat', arg)
          updateChatList(arg);
        })

        socket.on('timerUpdate', (time) =>{
          updateTimer(time)
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