
export function paintAndPrintImage(image) {

        
    console.log("Här är vår image", image);

    let originalImageContainer = document.createElement('div');
    originalImageContainer.setAttribute('class', 'grid-div');

    let rows = 15;
    let columns = 15;

    for(let x = 0; x < rows; x++) {

        for(let y = 0; y < columns; y++) {
            const pixel = document.createElement('div');

           
            if (image[x][y] === 0) {
                pixel.classList.add('White');
            } else if (image[x][y] === 1) {
                pixel.classList.add('Dark-purple');
            } else if (image[x][y] === 2) {
                pixel.classList.add('Light-purple');
            } else if (image[x][y] === 3) {
                pixel.classList.add('Baby-blue');
            } else if (image[x][y] === 4) {
                pixel.classList.add('Pink');
            }

            originalImageContainer.appendChild(pixel);
        }

    }
    app.appendChild(originalImageContainer);
 
    
}

