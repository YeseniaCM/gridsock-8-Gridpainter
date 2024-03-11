import { originalImages } from "./originalImages";
import { printWaitingForPlayers } from "./printWaitingForPlayers";

let button = document.createElement('button')
button.textContent = 'Addera bild'
app.append(button);

button.addEventListener('click', () => {
    playersAddingImage()
})

export function playersAddingImage () {
    const socket = io('http://localhost:3000');
    const user = JSON.parse(localStorage.getItem('user'));
    const singleUser = user.find(user => user.userId);
    const username = singleUser.userName;
    let altText = "Skapad bild av lag:" + printWaitingForPlayers.roomInput;
    let roomId = io.sockets.adapter.rooms.get(room)

    let sendImage = {
        src: username,
        alt: altText,
        colors : [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1],
            [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 2, 1],
            [1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 4, 3, 2, 2, 1],
            [1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 4, 3, 2, 2, 1],
            [1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 4, 3, 2, 2, 1],
            [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 2, 1],
            [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
            [1, 2, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 2, 2, 1],
            [1, 2, 3, 4, 4, 4, 4, 4, 4, 4, 4, 3, 2, 2, 1],
            [1, 2, 3, 4, 0, 0, 0, 0, 0, 0, 4, 3, 2, 2, 1]
      ]
    }

    fetch("http://localhost:3000/images/add", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(sendImage)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Adding Image", data);
        })
}