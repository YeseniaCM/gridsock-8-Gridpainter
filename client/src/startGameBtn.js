import io from 'socket.io-client';
import { startGameTimer } from "./startGameTimer.js";
import { exitGameBtn }  from "./printexitGameBtn.js";
import { homepageDiv } from './printHomePage.js'
import { printWaitingForPlayers }  from './printWaitingForPlayers.js'

export function startGameBtn() {
    let startGameBtn = document.createElement('button');
    startGameBtn.textContent = "Start game";
    startGameBtn.classList.add('startGameBtn');
    app.appendChild(startGameBtn);

    startGameBtn.addEventListener('click', () => {
        // Hämta spelets innehåll
        homepageDiv.innerHTML = '';
        app.innerHTML = '';

        printWaitingForPlayers();
        exitGameBtn();

        // Call on inside once game starts
        // startGameTimer();
        // printchat();
        


    })
}

function printchat() {
    const socket = io('http://localhost:3000');

    let chatContainer = document.createElement('div');
    chatContainer.classList.add('chatContainer');
  
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
      
      chatContainer.append(chatList, sendMsg, sendBtn);
      app.append(chatContainer);
}