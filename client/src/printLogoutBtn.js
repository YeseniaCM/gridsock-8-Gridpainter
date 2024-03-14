
import { printLogInForm } from "./printLogin.js";

export let logOutButton = document.createElement('button');

export function logOutBtn() {

    
    logOutButton.textContent = "Logout";
    logOutButton.classList.add('logOutBtn');
    app.append(logOutButton);

    logOutButton.addEventListener('click', () => {
        const socket = io('https://gridpainter-ltfli.ondigitalocean.app');

        
        localStorage.removeItem('user');
        localStorage.removeItem('userAssignedColor');
        app.innerHTML = "";
        printLogInForm();
        
        socket.emit('disconnecting')
            
    })
    
}