import io from 'socket.io-client';
import { startGameTimer } from "./startGameTimer.js";
import { loginForm } from './printLogin.js'

export function startGameBtn() {
    let startGameBtn = document.createElement('button');
    startGameBtn.textContent = "Start game";
    startGameBtn.classList.add('startGameBtn');
    app.appendChild(startGameBtn);

    startGameBtn.addEventListener('click', () => {
        // Hämta spelets innehåll
        loginForm.innerHTML = '';
        app.innerHTML = '';
        startGameTimer();
        printchat();

    })
}

function printchat() {
    const socket = io('http://localhost:3001');
  
    let sendMsg = document.createElement('input');
    sendMsg.placeholder = 'Type message';
  
    let sendBtn = document.createElement('button')
    sendBtn.textContent ='Send'
  
  
    let chatList = document.createElement('ul');
      
      sendBtn.addEventListener("click", () => {
        console.log("send chat", sendMsg.value);
        socket.emit("chat", sendMsg.value);
      })
      
      socket.on("chat", (arg) => {
        console.log("socket", arg);
        updateChat(arg);
      })
      
      function updateChat(chat) {
        let li = document.createElement("li")
        li.innerText = chat ;
        chatList.appendChild(li);
      }
  
      app.append(chatList, sendMsg, sendBtn)
}