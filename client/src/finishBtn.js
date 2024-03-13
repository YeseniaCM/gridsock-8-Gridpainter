import io from 'socket.io-client';

import { playersAddingImage } from './PlayerAddingImage';
import { gridDiv } from './printPaintOnGrid';
import { updateTimer } from './printPreviewPage.js';

let clickCount = 0;

export function finishBtn(roomInput, usersWithName, uncoloredGrid, image) {


    const socket = io('http://localhost:3000');

    let buttonContainer = document.createElement('div');
    buttonContainer.classList.add('buttonContainer');

    let finishBtn = document.createElement('button');
    finishBtn.textContent = "finished";

    let buttonDesc = document.createElement('p');
    buttonDesc.textContent = "when clicked you will not be able to edit the grid anymore";

    

    finishBtn.addEventListener('click', () => {
        finishBtn.disabled = true;
        buttonDesc.textContent = "waiting for the other players to press finish";
        clickCount++; // Increment clickCount when the button is clicked
        socket.emit('finishBtnClicked');
    })

    // socket.on('totalClickCount', (totalClickCount) => {
        
    //     if (totalClickCount === 4) {
    //         console.log("total click count so far", totalClickCount);
    //         // You can add additional logic here if needed
    //     }
    // });

    // socket.on('totalClickCount', (userClickCount) => {
    //      console.log("total click count so far", userClickCount);
    //      if (userClickCount === 4) {
    //      }
    // });
    
    socket.on('changeBackgroundColor', () => {
        gridDiv.innerHTML = '';
        app.innerHTML = '';
        playersAddingImage(roomInput, usersWithName,uncoloredGrid, image)

    })

    socket.on('intervalCleared', () => {
       console.log("intervallet är rensat");
    });
   

    buttonContainer.append(finishBtn, buttonDesc)
    app.append(buttonContainer);

  /*  let timerInterval = startGameTimer(socket);

    if (!timerInterval) {
        timerInterval = startGameTimer(socket);
    }
*/
    
    
  
}


