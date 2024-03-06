export function printPaintOnGrid(){

    let gridDiv = document.createElement('div');
    gridDiv.setAttribute('class', 'grid-div');

   let unColouredGrid =[
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
   ]

 app.append(gridDiv)

 createGridDrawing(unColouredGrid, gridDiv)
 console.log(gridDiv)
}

function createGridDrawing(unColouredGrid, gridDiv){
    gridDiv.innerHTML = '';

    let rows = 15;
    let columns = 15;

    
    for(let x = 0; x < rows; x++) {

        for(let y = 0; y < columns; y++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';

            gridDiv.append(pixel);

            pixel.addEventListener('click', () => {
                coloredPixel(x, y, unColouredGrid);
            })    
        }
    }

}

function coloredPixel(x,y, unColouredGrid){
console.log('x', x)
console.log('y', y)
console.log(unColouredGrid[x][y])
}




// printPaintOnGrid()