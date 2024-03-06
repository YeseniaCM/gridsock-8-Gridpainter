import printHomePage from './printHomePage'

export function goHomeBtn() {

    let homeBtn = document.createElement('button')
    homeBtn.textContent = 'Home Page';

    homeBtn.addEventListener('click', () => {
        printHomePage()
    })

    app.appendChild(homeBtn)
}