import { finishBtn } from './finishBtn.js';
import io from 'socket.io-client';

export let gridDivContainer = document.createElement('div');
gridDivContainer.setAttribute('class', 'grid-div-container');

export let gridDiv = document.createElement('div');
gridDiv.setAttribute('class', 'grid-div');

let gridFinished = false;

export function printPaintOnGrid(roomInput, usersWithName, image){
    gridDiv.innerHTML = '';
    app.innerHTML = '';
    const socket = io('https://gridpainter-ltfli.ondigitalocean.app');
    console.log('socket connected', socket.connected);

    socket.on("updatePaintGrid", (arg) => {
        updateGridCell(arg);
        
    })

    function updateGridCell(gridCell) {
        console.log('gridcell', gridCell)
     
        const { x, y, color} = gridCell;

        coloredPixel(x, y, unColouredGrid, Number(color));
    }

    let unColouredGrid = [
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

 createGridDrawing(unColouredGrid, gridDiv, socket)
 gridDivContainer.appendChild(gridDiv);
 app.appendChild(gridDivContainer);
 finishBtn(roomInput, usersWithName, unColouredGrid, image);
 console.log(gridDiv)
}
 
export function createGridDrawing(unColouredGrid, gridDiv, socket){

    let rows = 15;
    let columns = 15;

    for(let x = 0; x < rows; x++) {

        for(let y = 0; y < columns; y++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel')

            gridDiv.append(pixel);

        
            pixel.addEventListener('click', () => {
                if (!gridFinished) {
                    const storedColor = sessionStorage.getItem('userAssignedColor');
                    socket.emit('gridCellClicked', { x, y, unColouredGrid, color: storedColor});
                    coloredPixel(x, y, unColouredGrid, storedColor, pixel);
                }
                
            })    
        }
    }
}

function coloredPixel(x, y,unColouredGrid, storedColor, pixel){

   pixel = gridDiv.querySelector(`.pixel:nth-child(${x * 15 + y + 1})`);
   unColouredGrid[x][y] = storedColor;
  
    console.log('stored colour', storedColor)
    if(storedColor == 1){
        console.log('kommer vi hit ?')
        pixel.classList.add('Dark-purple')
       } else if(storedColor == 2){
        pixel.classList.add('Light-purple')
       } else if(storedColor == 3){
        pixel.classList.add('Baby-blue')
       } else if(storedColor == 4){
        pixel.classList.add('Pink')
       }

    console.log('x', x);
    console.log('y', y);
}

export function gridDisabled() {
    gridFinished = true;
}