import { loginForm, printLogInForm } from "./printLogin";
import { homepageDiv, printHomePage } from "./printHomePage.js";

export function printCreateUserForm() {
    app.removeChild(loginForm)

    let createUserContainer = document.createElement('div')
    createUserContainer.setAttribute('class', 'createUserContainer')

    let createUserPageTitle = document.createElement("h1");
    createUserPageTitle.innerText = "Create user";

    let createUserFormContainer = document.createElement('div');
    createUserFormContainer.classList.add('createUserForm');

    let createName = document.createElement("input");
    createName.placeholder = "Name";

    let createEmail  = document.createElement("input");
    createEmail.placeholder = "Email";

    let createPassword = document.createElement("input");
    createPassword.placeholder = "Password";
    createPassword.type = "password";

    let createUserBtn = document.createElement("button");
    createUserBtn.classList.add("createUserBtn");
    createUserBtn.innerText = "Create user";

    let backToLoginBtn = document.createElement('a');
    backToLoginBtn.innerText = "Back to sign in";

    backToLoginBtn.addEventListener('click', () => {
        app.innerHTML = "";
        printLogInForm();
    })

    createUserBtn.addEventListener("click", () => {
        if (createName.value.trim() === '' || createEmail.value.trim() === '' || createPassword.value.trim() === '') {
            return;
        }

    let newUser = { userName: createName.value, userEmail: createEmail.value, userPassword: createPassword.value};

    fetch("http://localhost:3000/users/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
       })
       .then(res => res.json())
       .then(data => {
            homepageDiv.innerHTML = '';
            localStorage.setItem("user", JSON.stringify(data));
            app.innerHTML = "";
            printHomePage()
       })
    })
    createUserFormContainer.append(createName, createEmail, createPassword, createUserBtn, backToLoginBtn);
    createUserContainer.append(createUserPageTitle, createUserFormContainer);
    app.appendChild(createUserContainer);
}
