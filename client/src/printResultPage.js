import { paintAndPrintImage } from "./originalImages";
import { logOutBtn } from "./printLogoutBtn";
import { exitGameBtn } from "./printexitGameBtn";
import { printchat } from "./startGameBtn";

export let resultDivText = document.createElement('div');
resultDivText.setAttribute('class', 'instructions-div-text');

export function printResultPage(data, roomInput, image, uncoloredGrid){
   
    console.log('original bild:', image);
    console.log('jämför med', uncoloredGrid);


// Comparing two images
    let commonElementsCount = 0;

    const totalElements = 15 * 15;

    for (let i = 0; i < 15; i++) {
        for (let j = 0; j < 15; j++) {
            
            if (image[i][j] === uncoloredGrid[i][j] && image[i][j] > 0) {
                commonElementsCount++;
            }
        }
    }

    const percentageUnFixed = (commonElementsCount / totalElements) * 100;
    
    const procentage = percentageUnFixed.toFixed(2) + '%';
    
    printchat(roomInput)

    let imageId = data.imageId;

    fetch(`http://localhost:3000/images/${imageId}`)
    .then(res => res.json())
    .then(data => {
    
        
        let colorsArray = JSON.parse(data[0].gridImage);
           

        let imageDiv = document.createElement('div');
        imageDiv.setAttribute('class', 'image-div');
            
        let arrayContainer = document.createElement('div');
        arrayContainer.classList.add('array-container');

        let originalImageContainer = document.createElement('div');
        originalImageContainer.setAttribute('class', 'grid-div');
        
paintAndPrintImage(colorsArray)

        let resultHeading = document.createElement('h1');
resultHeading.textContent = 'Your result';
// resultHeading.setAttribute('class', '');

let resultLeft = document.createElement('p');
// resultLeft.setAttribute('class', '');
resultLeft.textContent = `Correct colors: ${procentage}`;


resultDivText.append(resultLeft)
app.append(resultHeading, imageDiv, resultDivText)
       
})
 
paintAndPrintImage(image)
exitGameBtn()
logOutBtn()
}