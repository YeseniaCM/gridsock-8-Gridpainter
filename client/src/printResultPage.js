import { paintAndPrintImage } from "./originalImages";
import { logOutBtn } from "./printLogoutBtn";
import { exitGameBtn } from "./printexitGameBtn";
import { printchat } from "./startGameBtn";

export let resultDivText = document.createElement('div');
resultDivText.setAttribute('class', 'instructions-div-text');

export function printResultPage(data, roomInput, image, uncoloredGrid){
    // console.log('datan som kommer från playersAddingImage: ', data);
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
        // console.log("Användare:", data);
        
        let colorsArray = JSON.parse(data[0].gridImage);
            // console.log("Färger:", colorsArray);

        let imageDiv = document.createElement('div');
        imageDiv.setAttribute('class', 'image-div');
            
        let arrayContainer = document.createElement('div');
        arrayContainer.classList.add('array-container');

        let originalImageContainer = document.createElement('div');
        originalImageContainer.setAttribute('class', 'grid-div');
        
let rows = 15;
let columns = 15;

        for(let x = 0; x < rows; x++) {
        
            for(let y = 0; y < columns; y++) {
                const pixel = document.createElement('div');
        
               
                if (colorsArray[x][y] === 0) {
                    pixel.classList.add('colorZero');
                } else if (colorsArray[x][y] === 1) {
                    pixel.classList.add('colorOne');
                } else if (colorsArray[x][y] === 2) {
                    pixel.classList.add('colorTwo');
                } else if (colorsArray[x][y] === 3) {
                    pixel.classList.add('colorThree');
                } else if (colorsArray[x][y] === 4) {
                    pixel.classList.add('colorFour');
                }
        
                originalImageContainer.appendChild(pixel);
            }
        
        }

    imageDiv.append(arrayContainer, originalImageContainer)
        // app.appendChild(imageDiv);

        let resultHeading = document.createElement('h1');
resultHeading.textContent = 'Your result';
// resultHeading.setAttribute('class', '');

let resultLeft = document.createElement('p');
// resultLeft.setAttribute('class', '');
resultLeft.textContent = `Correct colors: ${procentage}`;

let resultRight = document.createElement('p');
// resultRight.setAttribute('class', '');
resultRight.textContent = 'Your time was: 02:39' + 'of '; 

resultDivText.append(resultLeft, resultRight)
app.append(resultHeading, imageDiv, resultDivText)
       
})
 

// Visa gruppens slumpmässigabild
paintAndPrintImage(image)
exitGameBtn()
logOutBtn()
}