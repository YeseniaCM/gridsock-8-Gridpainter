import {printHomePage} from './printHomePage'

export function goHomeBtn() {

    let homeBtn = document.createElement('button')
    homeBtn.classList.add('home-btn')
    homeBtn.textContent = 'Try again';

    homeBtn.addEventListener('click', () => {
        printHomePage()
    })

    app.appendChild(homeBtn)
}