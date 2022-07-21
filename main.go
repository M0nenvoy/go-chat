package main

import (
	"fmt"
	"go-chat/handle"
	"go-chat/handle/socket"
	"go-chat/history"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
)

func main() {
    // Load the chat history
    history.Sync()

    // On sigint save chat history before shutting down
    c := make(chan os.Signal)
    signal.Notify(c, os.Interrupt, syscall.SIGTERM)
    go func () {
        <-c
        log.Println("Saving chat history...")
        history.Save()
        log.Println("Success")
        os.Exit(1)
    } ()

    http.Handle("/socket", socket.New())
    http.HandleFunc("/", handle.Root)
    http.HandleFunc("/login", handle.Login)
    http.HandleFunc("/load", handle.Load)
    log.Fatal(http.ListenAndServe(":8000", nil))

}

func home(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintln(w, "The home is here")
}

func messageHandler(message []byte) {
    fmt.Println(string(message))
}
