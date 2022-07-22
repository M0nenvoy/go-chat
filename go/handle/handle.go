package handle

import (
	"fmt"
	"go-chat/history"
	"log"
	"net/http"
	"strings"
)

// Load chat history as json
func Load(w http.ResponseWriter, r *http.Request) {
    // Load json from history
    jsonString := history.Load()

    // Allow any ip to get this
    w.Header().Add("Access-Control-Allow-Origin", "*")
    fmt.Fprintf(w, "%s", jsonString)
}

/*
Handle the root requests.
if the request is exactly '/'
    Respond with index.html (chat) if the user is logged in,
    Otherwise respond with login.html
if the request contains some file name after the `/`,
serve files.
*/
func Root(w http.ResponseWriter, r *http.Request) {
    // Figure out if the client just wants the root or
    // is requesting some file
    path := r.URL.Path
    stripped := path[len("/"):]

    // Wants root
    if len(stripped) == 0 {
        // Check if user is logged in
        c, err := r.Cookie("username")
        if err != nil { // Not logged in
            // Redirect to login page
            http.Redirect(w, r, "/login", http.StatusFound)
            return
        }
        // Is logged in. Show the chat
        log.Println("User " + c.Value + " has joined the chat")
        http.ServeFile(w, r, "web/dist/index.html")
        return
    }

    // Client is requesting file

    // Validate the file query
    index := strings.Index(path, ".html")
    if index != -1 {
        // Don't allow loading html files
        w.WriteHeader(403)
        return
    }

    // But if it's not html, then the client is good to go.
    http.ServeFile(w, r, "web/dist/" + stripped)
}

func Login(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, "web/dist/login.html")
}
