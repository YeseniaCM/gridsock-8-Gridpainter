export function startGameTimer() {
    let distance = 10 * 60 * 1000;

    let timerContainer = document.createElement('div');
    timerContainer.classList.add('timerContainer');

    let timer = document.createElement('p');
    timer.classList.add('timer');
    timerContainer.appendChild(timer);

    let intervalId = setInterval(function() {
        let minutes = Math.floor(distance / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timer.innerText = minutes + ":" + (seconds < 10 ? "0" : "") + seconds; 
        if (distance <= 0) {
            clearInterval(intervalId); 
            timer.innerText = "You have run out of time!";
        } else {
            distance -= 1000; 
        }
    }, 1000);


    // to stop timer 
    // xxx.addEventListener('click', function() {
    //    clearInterval(intervalId);
    //});

    document.body.appendChild(timerContainer); 
}