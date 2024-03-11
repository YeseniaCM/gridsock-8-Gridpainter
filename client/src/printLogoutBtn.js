
import { printLogInForm } from "./printLogin.js";

export let logOutButton = document.createElement('button');

export function logOutBtn() {
    
    logOutButton.textContent = "Logout";
    logOutButton.classList.add('logOutBtn');
    app.append(logOutButton);

    logOutButton.addEventListener('click', () => {

        console.log("click");
        localStorage.removeItem('user');
        app.innerHTML = "";
        printLogInForm();
            
            
    })
    
}