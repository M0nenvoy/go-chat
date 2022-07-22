package socket

import (
	"go-chat/history"
	"net/http"

	"github.com/gorilla/websocket"

	"container/list"
	"log"
)


type Socket struct {
    connections*     list.List
    upgrader         websocket.Upgrader
}

func New() Socket {
    return Socket {
        connections: list.New(),
        upgrader: websocket.Upgrader{
            // Allow sockets from any origin
            CheckOrigin: func(r *http.Request) bool {
                return true
            },
        },
    }
}

func (s Socket) ServeHTTP(w http.ResponseWriter, r *http.Request) {
    con, err := s.upgrader.Upgrade(w, r, nil)
    log.Println("Trying to upgrade the connection...")
    if err != nil {
        log.Println("Error upgrading the connection: ", err)
    }
    log.Println("Upgraded")
    defer con.Close()

    // Add connection to a connections list
    element := s.connections.PushFront(con)
    defer s.connections.Remove(element)

    // Event loop
    for {
        _, message, err := con.ReadMessage()
        if err != nil {
            // Client has closed the connection probably.
            log.Println("Websocket has closed: ", err)
            break
        }
        // On a new message notify every other socket
        for e := s.connections.Front(); e != nil; e = e.Next() {
            e.Value.(*websocket.Conn).WriteMessage(websocket.TextMessage, message)
        }

        // Save new message to the RAM
        history.Receive(message)
    }
}
