import { loginForm } from './printLogin.js'

export function printHomePage() {
    loginForm.innerHTML = ''

    let homeHeading = document.createElement('h1');
    homeHeading.textContent = 'Can you gridpaint?';

    let instructionsDiv = document.createElement('div')

    let instructions = document.createElement('p');
    instructions.textContent = 'When 4 players has joined the game will start. You´ll get a 5 second glimpse of a picture, each person will get assigned a colour. To paint, press the box you want to color, you all have 10 minutes to complete the task. Can you do it ?'


    instructionsDiv.appendChild(instructions)

    loginForm.append(logOutBtn(), homeHeading,instructionsDiv, startGameBtn)

}