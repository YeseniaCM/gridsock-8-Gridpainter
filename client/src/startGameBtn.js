import io from 'socket.io-client';
// { startGameTimer } from "./startGameTimer.js";
import { exitGameBtn }  from "./printexitGameBtn.js";
import { homepageDiv } from './printHomePage.js'
import { printWaitingForPlayers, userAssignedColor }  from './printWaitingForPlayers.js'



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


export function printchat(room) {
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
      
      sendBtn.addEventListener("click", () => {
        data.map(user => {
          console.log("send chat", sendMsg.value);
          socket.emit("chat", {
            userName: user.userName,
            room: room,
            message: sendMsg.value,
            setNameColor: user.setNameColor
          });
          sendMsg.value = "";

        })
    })
  })
  chatContainer.append(heading, chatList, sendMsg, sendBtn);
  app.append(chatContainer);
}



export function updateChatList(chat) {
  const userAssignedColor = localStorage.getItem('userAssignedColor');

  const colors = {
    1: 'Dark-purple',
    2: 'Light-purple',
    3: 'Baby-blue',
    4: 'Pink'
  };

  const setNameColor = colors[userAssignedColor];
  
  console.log('chat', chat)
  let li = document.createElement("li")
  let usernameSpan = document.createElement('span');
  let messageSpan = document.createElement('span');

  //add color to both user and message
  //li.innerText = `${chat.userName}: ${chat.message}`;
  //li.classList.add(setNameColor);


  usernameSpan.innerText = chat.userName;
  usernameSpan.classList.add(setNameColor);

  messageSpan.innerText = ": " + chat.message;
  
  li.appendChild(usernameSpan)
  li.appendChild(messageSpan);
  chatList.appendChild(li);
}