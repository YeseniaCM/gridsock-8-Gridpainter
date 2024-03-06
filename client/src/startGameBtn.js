import { startGameTimer } from "./startGameTimer.js";
import { loginForm } from './printLogin.js'

export function startGameBtn() {
    let startGameBtn = document.createElement('button');
    startGameBtn.textContent = "Start game";
    startGameBtn.classList.add('startGameBtn');
    app.appendChild(startGameBtn);

    startGameBtn.addEventListener('click', () => {
        // Hämta spelets innehåll
        loginForm.innerHTML = '';
        app.innerHTML = '';
        startGameTimer();


    })
}