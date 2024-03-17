import io from 'socket.io-client';
import { exitGameBtn }  from "./printexitGameBtn.js";
import { homepageDiv } from './printHomePage.js'
import { printWaitingForPlayers }  from './printWaitingForPlayers.js'

export let startTheGameBtn = document.createElement('button');
startTheGameBtn.disabled = true;

export function startGameBtn(roomInput) {

  startTheGameBtn.textContent = "Start game";
  startTheGameBtn.classList.add('startGameBtn');
    app.append(startTheGameBtn);

    startTheGameBtn.addEventListener('click', () => {
        homepageDiv.innerHTML = '';
        app.innerHTML = '';

        printWaitingForPlayers(roomInput.value);
        exitGameBtn();
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
      data.map(user => {

      sendBtn.addEventListener("click", () => {
        if (sendMsg.value.trim() === "") {
          return;
        }

        socket.emit("chat", {
          userName: user.userName,
          room: room,
          message: sendMsg.value
        });
        sendMsg.value = "";
      })
    })
  })
  chatContainer.append(heading, chatList, sendMsg, sendBtn);
  app.append(chatContainer);
}

export function updateChatList(chat) {

  let li = document.createElement("li")
  let usernameSpan = document.createElement('span');
  usernameSpan.innerText = chat.userName;

  let messageSpan = document.createElement('span');
  messageSpan.innerText = ": " + chat.message;

  li.append(usernameSpan, messageSpan)
  chatList.appendChild(li);
}