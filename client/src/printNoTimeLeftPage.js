import { goHomeBtn } from "./printGoHomeBtn";
import { startGameBtn } from "./startGameBtn";

export let messageDiv = document.createElement('div');


export function printNoTimeLeftPage(){
    messageDiv.setAttribute('class', 'no-time-left-div')

    // add chat


    let heading = document.createElement('h3')
    heading.textContent = 'The time has run out, this is your result...';

    
    //display painted image, fetch from database



    messageDiv.append(heading)
    app.appendChild(messageDiv);
    goHomeBtn()
    startGameBtn()
}