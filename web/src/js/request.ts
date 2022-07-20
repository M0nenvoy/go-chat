import { message } from "./message"

export namespace request {

const HOSTNAME = window.location.hostname
const PORT     = '8000'

// Load all the messages from the server chat history
// return json string
export async function loadMessages() : Promise<Array<message.Message>> {
    let response = await fetch(`http://${HOSTNAME}:${PORT}/load`)
    return response.json()
}
}
