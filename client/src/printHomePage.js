import io from 'socket.io-client';
import { loginForm } from './printLogin.js'
import { logOutBtn } from './printLogoutBtn.js';
import { startGameBtn } from './startGameBtn.js';
import { playersAddingImage } from './PlayerAddingImage.js';

export let homepageDiv = document.createElement('div');
homepageDiv.classList.add('homePage');


export function printHomePage() {
    loginForm.innerHTML = '';
    app.innerHTML = '';

    let instructionArray = [
        'When 4 players has joined the game will start.',
        'You´ll get a 5 second glimpse of a picture',
        'Each person will get assigned a colour',
        'To paint, press the box you want to color',
        'you all have 10 minutes to complete the task',
    ]
    let homeHeading = document.createElement('h1');
    homeHeading.textContent = 'Can you gridpaint?';
    homeHeading.setAttribute('class', 'home-heading')

    let instructionsDiv = document.createElement('div')
    instructionsDiv.setAttribute('class', 'instructions-div')

    let instructionsUL = document.createElement('ul');
     
    instructionArray.forEach(inst => {
        let instructions = document.createElement('li');
        instructions.setAttribute('class', 'inst-li')
        instructions.textContent += inst;
        instructionsUL.append(instructions)
    })

    let instructionQuote = document.createElement('p');
    instructionQuote.textContent = 'Can you do it ?'
    instructionQuote.setAttribute('class', 'inst-quote')

    let circleDiv = document.createElement('div');
    circleDiv.setAttribute('class', 'circle-div');

    
    let roomInput = document.createElement('input');
    roomInput.placeholder = "Click to choose your room";
    roomInput.setAttribute('list', 'allRooms');
 
    let allRooms = document.createElement('datalist');
    allRooms.id = 'allRooms';
 
    let room1 = document.createElement('option');
    room1.value = 'Gris';
 
    let room2 = document.createElement('option');
    room2.value = 'Anka';
 
    let room3 = document.createElement('option');
    room3.value = 'Åsna';
 
    allRooms.appendChild(room1);
    allRooms.appendChild(room2);
    allRooms.appendChild(room3);
    
    //checks inputfield and check socket if room is full
    roomInput.addEventListener('input', () => {
        console.log(roomInput.value)
        
        const socket = io('http://localhost:3000');
        socket.emit('chosenRoom', roomInput.value)

        socket.on('check', (arg) => {
            console.log(arg)
          if (arg === 'Room is full') {
            homepageDiv.innerHTML = '';

            printHomePage()
            let errMessage = document.createElement('p');
            errMessage.innerHTML = arg
            homepageDiv.appendChild(errMessage)
        } 
         })
    })
  
    logOutBtn()
    instructionsDiv.append(instructionsUL, instructionQuote)
    homepageDiv.append( homeHeading, circleDiv, instructionsDiv,roomInput, allRooms)
    app.appendChild(homepageDiv)
    startGameBtn(roomInput)
    // playersAddingImage(roomInput.value);
}