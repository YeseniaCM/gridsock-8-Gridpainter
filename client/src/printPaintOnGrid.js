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
    const socket = io('http://localhost:3000');

    socket.on("updatePaintGrid", (arg) => {
        updateGridCell(arg);
        
    })

    function updateGridCell(gridCell) {
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

    createGridDrawing(unColouredGrid, gridDiv, socket, usersWithName)
    gridDivContainer.appendChild(gridDiv);
    printUsers(usersWithName);
    app.appendChild(gridDivContainer);
    finishBtn(roomInput, usersWithName, unColouredGrid, image);
}
 
export function createGridDrawing(unColouredGrid, gridDiv, socket, usersWithName){

    let rows = 15;
    let columns = 15;

    for(let x = 0; x < rows; x++) {

        for(let y = 0; y < columns; y++) {
            const pixel = document.createElement('div');
            pixel.classList.add('pixel')

            gridDiv.append(pixel);

            pixel.addEventListener('click', () => {
                if (!gridFinished) {
                    const storedUser = JSON.parse(localStorage.getItem('user'));
                    let storedUserName = storedUser.map(user => user.userName)

                    let storedColor  = usersWithName.find((user) => user.userName === storedUserName[0])

                    socket.emit('gridCellClicked', { x, y, unColouredGrid, color: Number(storedColor.color)});
                    coloredPixel(x, y, unColouredGrid, Number(storedColor.color), pixel);
                }
            })    
        }
    }
}

function coloredPixel(x, y,unColouredGrid, storedColor, pixel){

   pixel = gridDiv.querySelector(`.pixel:nth-child(${x * 15 + y + 1})`);
   unColouredGrid[x][y] = storedColor;
  
    if(storedColor == 1){
        pixel.classList.add('Dark-purple')
       } else if(storedColor == 2){
        pixel.classList.add('Light-purple')
       } else if(storedColor == 3){
        pixel.classList.add('Baby-blue')
       } else if(storedColor == 4){
        pixel.classList.add('Pink')
       }
}

export function gridDisabled() {
    gridFinished = true;
}

export function printUsers(usersWithName) {

    const storedUser = JSON.parse(localStorage.getItem('user'));    
    let storedUserName = storedUser.map(user => user.userName)
    let storedColor = usersWithName.find((user) => user.userName === storedUserName[0])
    
    let usersContainer = document.createElement('div');
    usersContainer.setAttribute('class', 'usersContainer');

    app.appendChild(usersContainer);

    const colors = {
        1: 'Dark-purple',
        2: 'Light-purple',
        3: 'Baby-blue',
        4: 'Pink'
    }

    usersWithName.forEach(user => {
        let userColorBox = document.createElement('div');
        userColorBox.setAttribute('class', 'userColorBox')
        userColorBox.classList.add(colors[user.color]);

        let userNames = document.createElement('p');
        userNames.textContent = user.userName;
        
        let users = document.createElement('div');
        users.setAttribute('class', 'userBox');
        users.append(userColorBox, userNames)

        usersContainer.appendChild(users);
    })
}
