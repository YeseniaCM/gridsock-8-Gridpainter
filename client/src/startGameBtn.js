export function startGameBtn() {
    let startGameBtn = document.createElement('button');
    startGameBtn.textContent = "Starta spelet";
    startGameBtn.classList.add('startGameBtn');
    app.appendChild(startGameBtn);

    startGameBtn.addEventListener('click', () => {
        console.log("Klick på starta spelet-knapp");

        // Hämta spelets innehåll

    })
}