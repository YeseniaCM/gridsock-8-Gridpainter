import { printHomePage } from "./printHomePage";

export function exitGameBtn(){
    let exitBtn = document.createElement('button');
    exitBtn.textContent = 'Exit game';
    exitBtn.addEventListener('click', ()=> {
        printHomePage()
    })
    app.appendChild(exitBtn)
}