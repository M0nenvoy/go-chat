package history

import (
	"encoding/json"
	"log"
	"os"
)

const HISTORY_FILE = "resource/history.json"

/*
Represents the message on the server
*/
type Message struct {
    Author      string      `json:"author"`
    Content     string      `json:"content"`
    Date        string      `json:"date"`
}


/*
Messages currently loaded
*/
var messages = make([]Message, 0, 1024)


/*
Load the `messages` array as a JSON array. Typically used when new
user connects to the server and needs the chat history.
*/
func Load() []byte {
    jsonString, err := json.Marshal(messages)
    if err != nil {
        log.Println("Failed to load the chat history for the client")
        // Return empty array
        return []byte("[]")
    }
    return jsonString
}
/*
On receiving new message from the socket add it to an array of messages.
Messages are received as JSON
*/
func Receive(jsonString []byte) {
    msg := Message {}
    json.Unmarshal(jsonString, &msg)

    messages = append(messages, msg)
}

/*
Read the file holding the chat history
*/
func readHistory() []byte {
    content, err := os.ReadFile(HISTORY_FILE)
    if err != nil {
        // If we can't read the chat history probably this file just
        // doesn't exist
        log.Println("Failed to load the chat history. Creating new")
        os.WriteFile(HISTORY_FILE, []byte("[]"), 0600)
    }
    return content
}

/*
Load saved messages from JSON file to the `messages` array.
There's no need to sync every time when a new message comes.
Only makes sense on the server start.
*/
func Sync() {
    jsonString := readHistory()
    json.Unmarshal(jsonString, &messages)
}

/*
Save the chat history from the RAM to the JSON file. Should do it
before the shutdown
*/
func Save()  {
    jsonString, err := json.Marshal(messages)
    if err != nil {
        log.Println("Failed to save chat history")
    }
    os.WriteFile(HISTORY_FILE, jsonString, 0600)
}
