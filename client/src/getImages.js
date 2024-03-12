
export function getImagesFromPlayers() {

    let playersId = sfsdf;
    
    // ändra 65e0817e-673b-49b6-b1c1-16e4109ea784 -> ${imageId}
    fetch(`http://localhost:3000/images/65e0817e-673b-49b6-b1c1-16e4109ea784`)
    .then(res => res.json())
    .then(data => {
        console.log("Användare:", data);
        
        if (data.message) {

            message.textContent = data.message
            setTimeout( ()=> {
             message.textContent = '';
            } , 2000)
        }else{
            let colorsArray = JSON.parse(data[0].colors);
            console.log("Färger:", colorsArray);
               // Skapa en div för att hålla arrayen
        let arrayContainer = document.createElement('div');
        arrayContainer.classList.add('array-container');
        app.append(arrayContainer);
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
app.appendChild(originalImageContainer);
        }
    })




}