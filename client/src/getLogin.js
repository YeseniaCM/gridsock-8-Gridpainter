import { printHomePage } from "./printHomePage";
import { loginForm } from "./printLogin";

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
            console.log("Användare:", data);
            
            if (data.message) {

                message.textContent = data.message
                setTimeout( ()=> {
                 message.textContent = '';
                } , 2000)
            }else{
                loginForm.innerHTML = '';
                let setUser = JSON.stringify(data)
                localStorage.setItem('user', setUser)
                //  logOutBtn()
                printHomePage()
            }
        })
}