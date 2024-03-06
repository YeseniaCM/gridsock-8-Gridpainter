import './src/styles/style.css'
import {printLogInForm } from './src/printLogin.js'


if(localStorage.getItem('user')) {
    printHomePage()
} else {
    printLogInForm() 
}






/** Button to go back to the homepage
 * import { goHomeBtn } from './src/printGoHomeBtn.js'
 * goHomeBtn()*/