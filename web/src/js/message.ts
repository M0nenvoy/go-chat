import { chat } from "./chat"

export namespace message {
export class Message {
    author:     string
    content:    string
    date:       Date


    constructor(author: string, content: string, date: Date) {
        this.author     = author
        this.content    = content
        this.date       = date
    }


    /*
     * Represent Message object as the message in the
     * chat
     *
     * It will be like this
     * <div class="message-container">
     *      <p class="message-content><b>Author: </b>content</p>
     *      <p class="message-date>content</p>
     * </div>
    */
    asHTML(): HTMLElement {
        let div = document.createElement('div')
        div.classList.add('message-container')

        let pc  = document.createElement('p')
        pc.classList.add('message-content')

        let pd  = document.createElement('p')
        pd.classList.add('message-date')

        let b = document.createElement('b')
        b.textContent = this.author + ': '

        let pc_text = document.createTextNode(this.content)
        pc.appendChild(b)
        pc.appendChild(pc_text)

        pd.textContent = dateFmt(this.date)

        div.appendChild(pc)
        div.appendChild(pd)

        // If the message didn't come from the same username assume it came from other people
        if (this.author !== chat.USERNAME) {
            div.classList.add('server')
        }

        return div
    }
}

/*
 * Create Message element from simple json
 */
export function fromJSON(json: any) : Message {
    return new Message(json.author, json.content, new Date(json.date))
}

// How date is formatted in the message
function dateFmt(date: Date) : string {
    // Leading zero for the time string        V
    let hours   = (date.getHours() < 10)    ? '0' + date.getHours()     : date.getHours()
    let minutes = (date.getMinutes() < 10)  ? '0' + date.getMinutes()   : date.getMinutes()
    return `${hours}:${minutes}`
}

/*
 * Create Message object from the JSON string
 */
export function fromJSONstring(jsonString: string): Message {
    let parsed = JSON.parse(jsonString)
    let date = new Date(parsed.date)

    return new Message(parsed.author, parsed.content, date)
}

}

