import { message }  from "./message"
import { chat }     from "./chat"


// Regardless the connection to the socket and interaction with
// it.
export namespace socket {

var WS: WebSocket = null

// Where is the socket
const HOSTNAME = window.location.hostname
const PORT     = '8000'

// Upgrade the connection. Set onerrpr, onopen, onclose, onmessage
// events. Make sure to do this first before doing other
// operations with the socket.
export function setupSocket() {
    console.log("Upgrading the connection...")
    WS = new WebSocket(`ws://${HOSTNAME}:${PORT}/socket`)

    WS.onerror = (e: ErrorEvent) => {
        console.log("Error on websocket: " + e.message)
    }

    WS.onopen = (_) => {
        console.log("Connection established")
    }

    WS.onmessage = processMessage

    WS.onclose = (e) => {
        if (e.wasClean) {
            console.log(`[close] Connection closed cleanly, code=${e.code}, reason=${e.reason}`)
        } else {
            // server process killed or network down
            // event.code is usually 1006 in this case
            console.log('[close] Connection died')
        }
    }
}

/*
 * ws.onmessage = processMessage
 * Message should come in format of json.
 * On message we parse that json into 'Message' object.
 * Then Message object to HTML representation of that object.
 * And then append that HTML representation to the chat.
*/
export function processMessage(e: MessageEvent) {
    // Message should come as json
    let json = e.data
    let msg = message.fromJSONstring(json)
    chat.spawnMessage(msg.asHTML())
}

/*
 * Send message to the socket as JSON
 */
export function sendMessage(msg: string) {
    WS.send(msg)
}
}

