import io from 'socket.io-client';

let gridDiv = document.createElement('div');
gridDiv.setAttribute('class', 'grid-div');
document.body.appendChild(gridDiv);

export function printPaintOnGrid(){
    
    const socket = io('http://localhost:3000');
    console.log('socket connected', socket.connected);

    socket.on("paintGrid", (arg) => {
        console.log("socket", arg);
        updateGrid(arg);
    })

    function updateGrid(updatedGrid) {
        gridDiv.innerHTML = '';
        createGridDrawing(updatedGrid, gridDiv, socket);
        //console.log("updated grid", updatedGrid);
    }

    

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


 //app.append(gridDiv)

 createGridDrawing(unColouredGrid, gridDiv, socket)
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
                coloredPixel(x, y, unColouredGrid, colors[currentColorIndex]);
                currentColorIndex = (currentColorIndex + 1) % colors.length;

                // change updatedGrid to uncoloredGrid to connect to socket
                socket.emit('paintGrid', updatedGrid);
            })    
        }
    }

}

function coloredPixel(x,y, unColouredGrid, color){

    unColouredGrid[x][y] = color;

    const pixel = document.querySelector(`.pixel:nth-child(${x * 15 + y + 1})`);

    pixel.style.backgroundColor = getColorStringFromValue(color);
    console.log('x', x)
    console.log('y', y)
    console.log(unColouredGrid[x][y])
    console.log(unColouredGrid);
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