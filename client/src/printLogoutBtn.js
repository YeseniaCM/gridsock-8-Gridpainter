
import { printLogInForm } from "./printLogin.js";
import io from 'socket.io-client';

export let logOutButton = document.createElement('button');

export function logOutBtn() {
    const socket = io('https://gridpainter-ltfli.ondigitalocean.app');
    
    logOutButton.textContent = "Logout";
    logOutButton.classList.add('logOutBtn');
    app.append(logOutButton);

    logOutButton.addEventListener('click', () => {
       

        
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('userAssignedColor');
        app.innerHTML = "";
        printLogInForm();
        
        socket.on('disconnect')
            
    })
    
}