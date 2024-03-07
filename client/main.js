import './src/styles/style.css'
import './src/styles/grid.css'
import {printLogInForm } from './src/printLogin.js'

import { printPaintOnGrid } from './src/printPaintOnGrid.js'

import { printHomePage } from './src/printHomePage.js'


if(localStorage.getItem('user')) {
    printHomePage()
 } else {     
    printLogInForm() 
}

// printNoTimeLeftPage()
// paintAndPrintImage();

/** Button to go back to the homepage
 * import { goHomeBtn } from './src/printGoHomeBtn.js'
 * goHomeBtn()*/

