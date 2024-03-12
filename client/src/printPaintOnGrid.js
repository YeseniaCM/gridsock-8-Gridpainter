import { finishBtn } from './finishBtn.js';
import io from 'socket.io-client';

export let gridDiv = document.createElement('div');
gridDiv.setAttribute('class', 'grid-div');

let colors = [1, 2, 3, 4];

export function printPaintOnGrid(){
    let userAssignedColor = null;
    gridDiv.innerHTML = '';
    app.innerHTML = '';
    const socket = io('http://localhost:3000');
    console.log('socket connected', socket.connected);

    function updateUserColors(userColors) {
        colors = userColors;
    }

    socket.on("updatePaintGrid", (arg) => {
        /*if (arg.color === userAssignedColor) {
            
        }*/

        console.log("socket", arg);
            updateGridCell(arg);
        
    })

    socket.on('updateUserColors', (userColors) => {
        updateUserColors(userColors);
    })

    function updateGridCell(gridCell) {
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

    createGridDrawing(unColouredGrid, gridDiv, socket, userAssignedColor)
    app.appendChild(gridDiv);
    finishBtn();
    console.log(gridDiv)
}
 
function createGridDrawing(unColouredGrid, gridDiv, socket, userAssignedColor){

    let rows = 15;
    let columns = 15;

    
    let currentColorIndex = 0;

    
    for(let x = 0; x < rows; x++) {

        for(let y = 0; y < columns; y++) {
            const pixel = document.createElement('div');
            pixel.className = 'pixel';

            gridDiv.append(pixel);

            

            pixel.addEventListener('click', () => {
                /*if (colors[currentColorIndex] === userAssignedColor) {
                   
                }*/

                currentColorIndex = (currentColorIndex + 1) % colors.length;
                coloredPixel(x, y, unColouredGrid, colors[currentColorIndex]);

                socket.emit('gridCellClicked', { x, y, color: colors[currentColorIndex]});
                console.log(pixel.style.backgroundColor);
                
            })    
        }
    }
}

function coloredPixel(x,y, unColouredGrid, color){

    unColouredGrid[x][y] = color;

    const pixel = gridDiv.querySelector(`.pixel:nth-child(${x * 15 + y + 1})`);

    pixel.style.backgroundColor = getColorStringFromValue(colorClasses);
    console.log('x', x);
    console.log('y', y);
    console.log(unColouredGrid[x][y]);
    console.log(unColouredGrid);

    console.log(pixel.style.backgroundColor);
}

const colorClasses = [
    'colorOne',
    'colorTwo',
    'colorThree',
    'colorFour'
]

/*
export function getColorStringFromValue(value) {
    switch (value) {
        case 1:
            return 'colorOne';
        case 2:
            return 'colorTwo';
        case 3:
            return 'colorThree';
        case 4:
            return 'colorFour';
    }
}
*/

export function getColorStringFromValue(value) {
    // Ensure the value is within the valid range
    if (value >= 1 && value <= colorClasses.length) {
        return colorClasses[value - 1];
    } else {
        throw new Error(`Invalid value: ${value}`);
    }
}