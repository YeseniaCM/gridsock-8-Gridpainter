
import { printLogInForm } from "./printLogin.js";
import io from 'socket.io-client';

export let logOutButton = document.createElement('button');

export function logOutBtn() {
    const socket = io('http://localhost:3000');
    
    logOutButton.textContent = "Logout";
    logOutButton.classList.add('logOutBtn');
    app.append(logOutButton);

    logOutButton.addEventListener('click', () => {
       
        localStorage.removeItem('user');
        sessionStorage.removeItem('userAssignedColor');
        app.innerHTML = "";
        printLogInForm();
        
        socket.on('disconnect')
            
    })
    
}