import io from 'socket.io-client';
import { playersAddingImage } from './PlayerAddingImage';
import { gridDiv } from './printPaintOnGrid';


export function finishBtn(roomInput, usersWithName, uncoloredGrid) {


    const socket = io('http://localhost:3000');

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');

    let finishBtn = document.createElement('button');
    finishBtn.textContent = "finished";

    let buttonDesc = document.createElement('p');
    buttonDesc.textContent = "when clicked you will not be able to edit the grid anymore";

    let clickCount = 0;

    finishBtn.addEventListener('click', () => {

        finishBtn.disabled = true;

        buttonDesc.textContent = "waiting for the other players to press finish";
        

        socket.emit('finishBtnClicked');
    })

    socket.on('updateClickCount', (userClickCount) => {
        console.log("total click count", userClickCount);
    })
    
    socket.on('changeBackgroundColor', () => {
        document.body.style.backgroundColor = "red";
        gridDiv.innerHTML = '';
        app.innerHTML = '';
        playersAddingImage(roomInput, usersWithName,uncoloredGrid)
    })

    buttonContainer.append(finishBtn, buttonDesc)
    app.append(buttonContainer);
}
