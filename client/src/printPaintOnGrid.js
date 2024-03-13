import { finishBtn } from './finishBtn.js';
import io from 'socket.io-client';
import { userAssignedColor } from './printWaitingForPlayers.js';

export let gridDiv = document.createElement('div');
gridDiv.setAttribute('class', 'grid-div');


export function printPaintOnGrid(roomInput, usersWithName, image){
    gridDiv.innerHTML = '';
    app.innerHTML = '';
    const socket = io('http://localhost:3000');
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
 app.appendChild(gridDiv);
 finishBtn(roomInput, usersWithName, unColouredGrid, image);
 console.log(gridDiv)
}
 
function createGridDrawing(unColouredGrid, gridDiv, socket, color){

    let rows = 15;
    let columns = 15;

    


    
    for(let x = 0; x < rows; x++) {

        for(let y = 0; y < columns; y++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel')

            gridDiv.append(pixel);

        
            pixel.addEventListener('click', () => {
                
                
                const storedColor = localStorage.getItem('userAssignedColor');
                

                //const userColorClass = colors[currentColorIndex % colors.length]
               
                socket.emit('gridCellClicked', { x, y, unColouredGrid, color: storedColor});

             

                coloredPixel(x, y, unColouredGrid, storedColor,pixel);
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
        pixel.classList.add('colorOne')
       } else if(storedColor == 2){
        pixel.classList.add('colorTwo')
       } else if(storedColor == 3){
        pixel.classList.add('colorThree')
       } else if(storedColor == 4){
        pixel.classList.add('colorFour')
       }


    console.log('x', x);
    console.log('y', y);
    

}

