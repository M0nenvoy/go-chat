import { socket } from "./socket"
import { chat } from "./chat"
import { request } from "./request"
import { message } from "./message"
import { cookie } from "./cookie"


// Expose functions so that they are available
// from html
declare global {
    interface Window {
        send: Function,
    }
}
window.send = send

function send() {
    chat.onSend()
}

async function main() {
    // Check if the user is logged in
    let username = cookie.username()

    // User is not logged in
    if (username === "") {
        console.log("Unauthorized")
    }
    chat.USERNAME = username

    // Ready the websocket
    socket.setupSocket()

    // Send message on 'Enter' press
    chat.input.addEventListener("keydown", (e: KeyboardEvent) => {
        // If key pressed is enter
        if (e.key == "Enter") {
            e.preventDefault()
            chat.onSend()
        }
    })

    // Fill chat with the history from the server
    let messages = await request.loadMessages()
    messages.forEach(msg => {
        let html = message.fromJSON(msg).asHTML()
        chat.spawnMessage(html)
    })
}

document.addEventListener("DOMContentLoaded", main)
