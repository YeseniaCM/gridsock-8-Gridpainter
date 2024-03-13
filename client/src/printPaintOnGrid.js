import { finishBtn } from './finishBtn.js';
import io from 'socket.io-client';
import { userAssignedColor } from './printWaitingForPlayers.js';

export let gridDiv = document.createElement('div');
gridDiv.setAttribute('class', 'grid-div');

let colors = [1, 2, 3, 4];

export function printPaintOnGrid(){
    gridDiv.innerHTML = '';
    app.innerHTML = '';
    const socket = io('http://localhost:3000');
    console.log('socket connected', socket.connected);

    socket.on("updatePaintGrid", (arg) => {
        /*if (arg.color === userAssignedColor) {
            
        }*/

        console.log("socket", arg);
            updateGridCell(arg);
        
    })

    function updateGridCell(gridCell) {
        const { x, y, color } = gridCell;
        coloredPixel(x, y, unColouredGrid, color);
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
    console.log(userAssignedColor);
    finishBtn();
    console.log(gridDiv)
}
 
function createGridDrawing(unColouredGrid, gridDiv, socket){

    let rows = 15;
    let columns = 15;

    
    let currentColorIndex = 0;

    
    for(let x = 0; x < rows; x++) {

        for(let y = 0; y < columns; y++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';

            gridDiv.append(pixel);

        
            pixel.addEventListener('click', () => {
                
                //userAssignedColor = (userAssignedColor + 1) % colors.length;
                //userAssignedColor = currentColorIndex;
                //coloredPixel(x, y, unColouredGrid, colors[userAssignedColor], userAssignedColor);
                coloredPixel(x, y, unColouredGrid, colors);
                //coloredPixel(x, y, unColouredGrid, colors);

                socket.emit('gridCellClicked', { x, y, color: userAssignedColor});
                socket.emit('gridCellClicked', { x, y, color: colors[currentColorIndex]});
                console.log(currentColorIndex);
                console.log(userAssignedColor);
            })    
        }
    }
}

function coloredPixel(x,y, unColouredGrid, color, userAssignedColor){

    unColouredGrid[x][y] = color;

    const pixel = gridDiv.querySelector(`.pixel:nth-child(${x * 15 + y + 1})`);
    
    pixel.style.backgroundColor = getColorStringFromValue(userAssignedColor);
    console.log('x', x);
    console.log('y', y);
    console.log(color);
    console.log(unColouredGrid[x][y]);
    console.log(userAssignedColor);

    console.log(pixel.style.backgroundColor);
    
}


export function getColorStringFromValue(value) {
    switch (value) {
        case 1:
            return '#ff0000';
        case 2:
            return '#1500ff';
        case 3:
            return '#1eff00';
        case 4:
            return '#fff200';
    }
}
