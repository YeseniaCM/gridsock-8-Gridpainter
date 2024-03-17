import './src/styles/style.css'
import {printLogInForm } from './src/printLogin.js'
import { printHomePage } from './src/printHomePage.js'

if(localStorage.getItem('user')) {
    printHomePage()
 } else {     
    printLogInForm() 
}

