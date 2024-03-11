import { finishBtn } from './finishBtn.js';
import io from 'socket.io-client';

let gridDiv = document.createElement('div');
gridDiv.setAttribute('class', 'grid-div');
app.appendChild(gridDiv);

export function printPaintOnGrid(){
    
    const socket = io('http://localhost:3000');
    console.log('socket connected', socket.connected);

    socket.on("updatePaintGrid", (arg) => {
        console.log("socket", arg);
        updateGridCell(arg);
    })

    function updateGridCell(gridCell) {
        //gridDiv.innerHTML = '';
        const { x, y, color } = gridCell;
        coloredPixel(x, y, unColouredGrid, color);
        //console.log("updated grid", updatedGrid);
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
       
 //app.append(gridDiv)

 createGridDrawing(unColouredGrid, gridDiv, socket)
 finishBtn();
 console.log(gridDiv)
}

function createGridDrawing(unColouredGrid, gridDiv, socket){

    let rows = 15;
    let columns = 15;

    let colors = [1, 2, 3, 4];
    let currentColorIndex = 0;

    
    for(let x = 0; x < rows; x++) {

        for(let y = 0; y < columns; y++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';

            gridDiv.append(pixel);

            

            pixel.addEventListener('click', () => {
                currentColorIndex = (currentColorIndex + 1) % colors.length;
                coloredPixel(x, y, unColouredGrid, colors[currentColorIndex]);

                // change updatedGrid to uncoloredGrid to connect to socket
                socket.emit('gridCellClicked', { x, y, color: colors[currentColorIndex]});
                console.log(pixel.style.backgroundColor);
            })    
        }
    }
}

function coloredPixel(x,y, unColouredGrid, color){

    unColouredGrid[x][y] = color;

    const pixel = gridDiv.querySelector(`.pixel:nth-child(${x * 15 + y + 1})`);

    pixel.style.backgroundColor = getColorStringFromValue(color);
    console.log('x', x);
    console.log('y', y);
    console.log(unColouredGrid[x][y]);
    console.log(unColouredGrid);

    console.log(pixel.style.backgroundColor);
}
function getColorStringFromValue(value) {
    switch (value) {
        case 1:
            return "red";
        case 2:
            return "blue";
        case 3:
            return "green";
        case 4:
            return "pink";
    }
}


// printPaintOnGrid()