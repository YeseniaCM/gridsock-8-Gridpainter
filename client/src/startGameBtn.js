import { startGameTimer } from "./startGameTimer.js";
import { exitGameBtn }  from "./printexitGameBtn.js";
import { homepageDiv } from './printHomePage.js'

export function startGameBtn() {
    let startGameBtn = document.createElement('button');
    startGameBtn.textContent = "Start game";
    startGameBtn.classList.add('startGameBtn');
    app.appendChild(startGameBtn);

    startGameBtn.addEventListener('click', () => {
        // Hämta spelets innehåll
        homepageDiv.innerHTML = '';
        app.innerHTML = '';
        startGameTimer();
        exitGameBtn()

    })
}