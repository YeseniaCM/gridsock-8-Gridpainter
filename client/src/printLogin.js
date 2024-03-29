import { printCreateUserForm } from './printCreateUserForm.js';
import { getLogIn } from './getLogin.js'

export  let loginForm = document.createElement('div');

export function printLogInForm() {
    
    loginForm.setAttribute('class', 'login-form')

    loginForm.innerHTML = '';
    let heading = document.createElement('h1')
    heading.textContent = 'Gridpainter'
     
    let inputEmail = document.createElement('input');
    inputEmail.placeholder = 'Email';

    let inputPassword = document.createElement('input');
    inputPassword.classList.add("input-password")
    inputPassword.type = 'password';
    inputPassword.placeholder = 'Password';

    let message = document.createElement('p');

    let signInBtn = document.createElement('button');
    signInBtn.textContent = 'Sign in'

    let createNewUser = document.createElement('a');
    createNewUser.textContent = 'Create new account'

    signInBtn.addEventListener('click', () => {
        getLogIn(inputEmail.value, inputPassword.value, message)
    })

    createNewUser.addEventListener('click', () => {
        printCreateUserForm()
    })
    loginForm.append(heading, inputEmail, inputPassword, message, signInBtn, createNewUser)
    app.appendChild(loginForm);
}

