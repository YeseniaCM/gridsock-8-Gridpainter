import { printLogInForm } from "./printLogin.js";
export function logOutBtn() {
    
    let logOutBtn = document.createElement('button');
    logOutBtn.textContent = "Logout";
    logOutBtn.classList.add('logOutBtn');
    app.append(logOutBtn);

    logOutBtn.addEventListener('click', () => {

        console.log("click");
        localStorage.removeItem('user');
        app.innerHTML = "";
        printLogInForm();
            
            
    })
    
}