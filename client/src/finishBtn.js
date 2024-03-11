import io from 'socket.io-client';

export function finishBtn() {

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
        console.log(clickCount);

        socket.emit('finishBtnClicked');
    })

    socket.on('updateClickCount', (userClickCount) => {
        console.log("total click count", userClickCount);
    })
    
    socket.on('changeBackgroundColor', () => {
        document.body.style.backgroundColor = "red";
    })

    buttonContainer.append(finishBtn, buttonDesc)
    app.append(buttonContainer);
}
