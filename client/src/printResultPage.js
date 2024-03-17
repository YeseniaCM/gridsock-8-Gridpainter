import { paintAndPrintImage } from "./originalImages";
import { exitGameBtn } from "./printexitGameBtn";
import { printchat } from "./startGameBtn";

export let resultDivText = document.createElement('div');
    resultDivText.setAttribute('class', 'instructions-div-text');

export let resultPageContainer = document.createElement('div');
    resultPageContainer.setAttribute('class', 'resultPageContainer');

export function printResultPage(data, roomInput, image, uncoloredGrid){
    app.classList.add('resultPage');

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

        let resultText = document.createElement('h1');
        resultText.textContent = 'Your result';

        let resultLeft = document.createElement('p');
        resultLeft.textContent = `Correct colors: ${procentage}`;


        resultDivText.append(resultText, resultLeft)
        resultPageContainer.append(resultDivText)
        app.append(resultPageContainer);

        let colorsArrayDiv = document.createElement('div');
        paintAndPrintImage(colorsArray);
        colorsArrayDiv.append(colorsArray); 

        let originalImageDiv = document.createElement('div');
        paintAndPrintImage(image);
        originalImageDiv.append(image); 
})
exitGameBtn()
}