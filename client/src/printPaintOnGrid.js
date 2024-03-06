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
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
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

    
    for(let i = 0; i < rows; i++) {

        for(let j = 0; j < columns; j++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';

            gridDiv.append(pixel);

            pixel.addEventListener('click', () => {
                coloredPixel(i, j, unColouredGrid);
            })    
        }
    }

}

function coloredPixel(i,j, unColouredGrid){
console.log('i', i)
console.log('j', j)
console.log(unColouredGrid[i][j])
}