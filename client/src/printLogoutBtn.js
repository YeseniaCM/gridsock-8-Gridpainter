
import { printLogInForm } from "./printLogin.js";

export let logOutButton = document.createElement('button');

export function logOutBtn() {

    
    logOutButton.textContent = "Logout";
    logOutButton.classList.add('logOutBtn');
    app.append(logOutButton);

    logOutButton.addEventListener('click', () => {
        const socket = io('http://localhost:3000');

        console.log("click");
        localStorage.removeItem('user');
        app.innerHTML = "";
        printLogInForm();
        
        socket.emit('disconnecting')
            
    })
    
}