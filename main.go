//go:generate go run -tags generate gen.go

package main

import (
	"fmt"
	logger "log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"runtime"

	"github.com/zserge/lorca"
)

// Go types that are bound to the UI must be thread-safe, because each binding
// is executed in its own goroutine. In this simple case we may use atomic
// operations, but for more complex cases one should use proper synchronization.

var uiErr error
var ui lorca.UI

func main() {
	args := []string{}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=Lorca")
	}
	ui, uiErr = lorca.New("", "", 900, 650, args...)
	if uiErr != nil {
		logger.Fatal(uiErr)
	}
	defer ui.Close()

	// Bind Request to Go Request handler
	ui.Bind("Request", RequestHandler)

	// Load HTML.
	// You may also use `data:text/html,<base64>` approach to load initial HTML,
	// e.g: ui.Load("data:text/html," + url.PathEscape(html))
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		logger.Fatal(err)
	}
	defer ln.Close()
	go http.Serve(ln, http.FileServer(FS))
	ui.Load(fmt.Sprintf("http://%s", ln.Addr()))

	// Wait until the interrupt signal arrives or browser window is closed
	sigc := make(chan os.Signal)
	signal.Notify(sigc, os.Interrupt)
	select {
	case <-sigc:
	case <-ui.Done():
	}

	logger.Println("exiting...")
}
