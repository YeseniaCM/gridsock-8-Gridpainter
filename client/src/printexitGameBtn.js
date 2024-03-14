import { printHomePage } from "./printHomePage";

export function exitGameBtn(){
    let exitBtn = document.createElement('button');
    exitBtn.classList.add('exitGameBtn');
    exitBtn.textContent = 'Exit game';
    exitBtn.addEventListener('click', ()=> {
    const socket = io('http://localhost:3000');
        printHomePage()
        socket.emit('disconnecting')
        
    })
    app.appendChild(exitBtn)
}