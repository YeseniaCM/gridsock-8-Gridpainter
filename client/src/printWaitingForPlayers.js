import io from 'socket.io-client';
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
  //waitingUserFrom.textContent = "players waiting";


  let circleDiv = document.createElement('div');
  circleDiv.setAttribute('class', 'circle-div instructionsCircle');

    
  instructionsDivText.append( instructionHeading, instructionLeft,instructionRight, waitingUserFrom, circleDiv)
  app.append(instructionsDivText, loadingAnimation, loadingAnimation2, loadingAnimation3)
  playersWaiting(instructionRight, roomInput, waitingUserFrom)
}

function playersWaiting(instructionsRight, roomInput, waitingUserFrom) {
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
       // console.log(roomArg);
      })

        //assign color to user
        socket.on('playerConnected', (usersWithName) => {
        
          const storedUser = JSON.parse(localStorage.getItem('user'));
          let storedUserName = storedUser.map(user => user.userName)
          let storedColor = usersWithName.find((user) => user.userName === storedUserName[0])
          console.log(storedColor);

          const colors = {
            1: 'Dark-purple',
            2: 'Light-purple',
            3: 'Baby-blue',
            4: 'Pink'
          }
          

          instructionsRight.textContent = `Room: ${roomInput}, Connected users: `

          usersWithName.forEach(user => {
            let instructionsRightColor = document.createElement('span');
            instructionsRightColor.textContent = user.userName;
            instructionsRightColor.classList.add(colors[user.color] + '-text');
            instructionsRight.appendChild(instructionsRightColor);

            waitingUserFrom.textContent = `Your assigned color is: `
            let assignedColor = document.createElement('span');
            assignedColor.textContent = colors[storedColor.color];
            assignedColor.classList.add(colors[storedColor.color] +  '-text');
            waitingUserFrom.appendChild(assignedColor);
          })
        
          socket.emit('assignedColor', {userName: user.userName, id: user.socketId, storedColor})
          socket.emit('userColor', {userName: user.userName});

            
            
         

       

          socket.on('randomImage', (image) => {
            // check if 4 is connected and start game

            if(usersWithName.length === 4){
              printPreviewPage(roomInput, usersWithName, image)
              paintAndPrintImage(image)
              socket.on('timerExpired', (time) =>{

                printNoTimeLeftPage(time)
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