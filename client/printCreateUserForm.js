export function printCreateUserForm() {
    let createUserContainer = document.getElementById('app');

    let createUserPageTitle = document.createElement("h1");
    createUserPageTitle.innerText = "Create user";

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
           
          localStorage.setItem("user", data.user);
          console.log(data.user);
        
       })

    })


    createUserContainer.append(createUserPageTitle, createName, createEmail, createPassword, createUserBtn);
}

printCreateUserForm();