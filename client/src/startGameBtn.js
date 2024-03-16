import io from 'socket.io-client';
// { startGameTimer } from "./startGameTimer.js";
import { exitGameBtn }  from "./printexitGameBtn.js";
import { homepageDiv } from './printHomePage.js'
import { printWaitingForPlayers }  from './printWaitingForPlayers.js'



export function startGameBtn(roomInput) {

  
    let startGameBtn = document.createElement('button');
    startGameBtn.textContent = "Start game";
    startGameBtn.classList.add('startGameBtn');


    
    app.append(startGameBtn);

    startGameBtn.addEventListener('click', () => {
        homepageDiv.innerHTML = '';
        app.innerHTML = '';

        printWaitingForPlayers(roomInput.value);
        exitGameBtn();
        
        // Call on inside once game starts
        // startGameTimer();

        //finishBtn(); - ska printas när 4 personer har ansulutit

    })
}
let chatContainer = document.createElement('div');

let chatList = document.createElement('ul');


export function printchat(room, usersWithName) {
  chatContainer.innerHTML = '';
    const socket = io('http://localhost:3000');


    chatContainer.classList.add('chatContainer');
  
    let heading = document.createElement('h4')
    heading.textContent = `Gridpainter gameroom ${room}`;
    let sendMsg = document.createElement('input');
    sendMsg.placeholder = 'Type message';
  
    let sendBtn = document.createElement('button')
    sendBtn.textContent ='Send'
  
   
    const user = JSON.parse(localStorage.getItem('user'))
    let singleUser = user.find(user => user.userId)
  
    fetch('http://localhost:3000/users/' + singleUser.userId)
    .then(res => res.json())
    .then(data => {
    console.log(data)

    const storedUser = JSON.parse(localStorage.getItem('user'));
    let storedUserName = storedUser.map(user => user.userName)
    console.log(usersWithName);

    
    //let storedColor = usersWithName.find(user => user.userName === storedUserName[0]);
      sendBtn.addEventListener("click", () => {
        usersWithName.forEach(username => {
          console.log("send chat", sendMsg.value);
          socket.emit("chat", {
            userName: username,
            room: room,
            message: sendMsg.value,
            userColor: usersWithName.find(user => user.userName === storedUserName[0])
          });
        })
        sendMsg.value = "";
    })
  })
  chatContainer.append(heading, chatList, sendMsg, sendBtn);
  app.append(chatContainer);
}



export function updateChatList(chat, usersWithName) {
 
  
  console.log(storedUserName);
  console.log(storedUser);
  console.log(usersWithName);
  

  //console.log('user', user)
  //console.log('storedcolor', storedColor);

  const colors = {
    1: 'Dark-purple',
    2: 'Light-purple',
    3: 'Baby-blue',
    4: 'Pink'
  }
  
  usersWithName.forEach(user => {
    console.log('chat', chat)
    let li = document.createElement("li")
    let usernameSpan = document.createElement('span');
    usernameSpan.innerText = user.userName;
    usernameSpan.classList.add(colors[storedColor.color]);


    let messageSpan = document.createElement('span');
    messageSpan.innerText = ": " + chat.message;
    
    li.append(usernameSpan, messageSpan)
    chatList.appendChild(li);
  })
  
}