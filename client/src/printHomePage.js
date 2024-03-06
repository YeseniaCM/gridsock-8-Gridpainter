import { loginForm } from './printLogin.js'
import { logOutBtn } from './printLogoutBtn.js';
import { startGameBtn } from './startGameBtn.js';


export function printHomePage() {
    loginForm.innerHTML = ''

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
        console.log(inst)
        instructions.textContent += inst;
        instructionsUL.append(instructions)
    })

    let instructionQuote = document.createElement('p');
    instructionQuote.textContent = 'Can you do it ?'
    instructionQuote.setAttribute('class', 'inst-quote')

    let circleDiv = document.createElement('div');
    circleDiv.setAttribute('class', 'circle-div');

    logOutBtn()
    instructionsDiv.append(instructionsUL, instructionQuote)
    loginForm.append( homeHeading, circleDiv, instructionsDiv )
    startGameBtn()

}