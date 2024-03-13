/*


export function startGameTimer(socket) {
    let distance = 10 * 60 * 1000;

    let timerContainer = document.createElement('div');
    timerContainer.classList.add('timerContainer');

    let timer = document.createElement('p');
    timer.classList.add('timer');
    

    let intervalId = setInterval(function() {
        let minutes = Math.floor(distance / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timer.innerText = minutes + ":" + (seconds < 10 ? "0" : "") + seconds; 
        if (distance <= 0) {
            clearInterval(intervalId); 
            timer.innerText = "You have run out of time!";
            printNoTimeLeftPage()
        } else {
            distance -= 1000; 
            socket.emit('timerUpdate', { minutes, seconds });
        }
    }, 1000);


    // Stop timer once fourt player has pressed finish function
    // xxx.addEventListener('click', function() {
    //    clearInterval(intervalId);
    //});

    timerContainer.appendChild(timer);
    app.append(timerContainer); 
    // document.body.append(timerContainer);
    return intervalId;

    
}

*/

