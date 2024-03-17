import { homepageDiv, printHomePage } from "./printHomePage.js";
import { loginForm } from "./printLogin.js";

export function getLogIn (email, password, message) {
    let checkUser = {userEmail: email, userPassword: password}

    fetch("http://localhost:3000/users/login", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(checkUser)
        })
        .then(res => res.json())
        .then(data => {
        
            if (data.message) {
                message.textContent = data.message
                setTimeout( ()=> {
                 message.textContent = '';
                } , 2000)
            } else {
                loginForm.innerHTML = '';
                homepageDiv.innerHTML = '';
                let setUser = JSON.stringify(data)
                localStorage.setItem('user', setUser)
                printHomePage()
            }
        })
}