import { goHomeBtn } from "./printGoHomeBtn";
import { printchat, startGameBtn } from "./startGameBtn";
import { gridDiv } from "./printPaintOnGrid";
import { exitGameBtn } from "./printexitGameBtn";

export let messageDiv = document.createElement('div');


export function printNoTimeLeftPage(){
    // const socket = io('http://localhost:3000');

    gridDiv.innerHTML = '';
    app.innerHTML = '';
    messageDiv.setAttribute('class', 'no-time-left-div')

    printchat()


    let heading = document.createElement('h3')
    heading.textContent = 'The time has run out!';

    


    messageDiv.append(heading)
    app.appendChild(messageDiv);
    goHomeBtn()
    exitGameBtn()
    
}