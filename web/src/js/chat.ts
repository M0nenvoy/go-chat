import { socket } from "./socket"
import { message } from "./message"
import { cookie } from "./cookie"

// Regardless the chat. Putting and receiving messages
export namespace chat {


export let USERNAME = ""
// Container for the messages
const container = document.getElementById("chat-container")

// Text area where users are writing their messages
export const input: HTMLTextAreaElement = document.getElementById("chat-input") as HTMLTextAreaElement

// Spawn new message in the chat
export function spawnMessage(element: HTMLElement) {
    // Name of the class for marking smooth appearing
    let animClass = "appearing"
    // animClass makes the transition instant
    element.classList.add(animClass)

    // This inserts from the bottom since we use flex-direction: reverse
    container.insertBefore(element, container.firstChild)

    // Dinamically calculate the height of an object
    let height = element.offsetHeight
    element.style.marginBottom = `-${height + 0}px`
    setTimeout(() => {
        element.style.marginBottom = ''
        element.classList.remove(animClass)
    // Put a little delay here. Dunno why. It doesn't work without
    // it
    }, 10)
}

// What happens when the send event is triggered
// in the chat
export function onSend() {
    // Get the content of the input
    let content = input.value

    if (content == "") {
        // No need to send anything if the message
        // is empty
        return
    }

    // Send the message as json
    let username = (USERNAME === "") ? "anon" : USERNAME
    let msg = new message.Message(username, content, new Date())
    let json = JSON.stringify(msg)
    socket.sendMessage(json)
    console.log("Sending the message to the server: " + json)

    // Empty the textarea
    input.value = ""
}
}
