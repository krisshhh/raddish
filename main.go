//go:generate go run -tags generate gen.go

package main

import (
	"crypto/tls"
	"fmt"
	"log"
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
var restClient RabbitHTTPClient
var rabbitMqConnection AmqpConnection

func main() {
	args := []string{}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=Lorca")
	}
	ui, uiErr = lorca.New("", "", 900, 650, args...)
	if uiErr != nil {
		log.Fatal(uiErr)
	}
	defer ui.Close()

	// A simple way to know when UI is ready (uses body.onload event in JS)
	ui.Bind("start", func() {
		log.Println("UI is ready")
	})

	ui.Bind("Login", func(str string) {
		UIlog(str)
		det := ParseLoginDetails(str)
		fmt.Println(det)

		// connect to rabbitmq
		amqpURL := fmt.Sprintf("amqp://%s:%s@%s:%s", det.Username, det.Password, det.Host, det.Port)
		restURL := fmt.Sprintf("http://%s:%s@%s:%s/api", det.Username, det.Password, det.Host, "15672")
		UIlog(amqpURL)
		rabbitMqConnection = RabbitMqConnect(amqpURL)
		if rabbitMqConnection.connected == false {
			UIRespond("LOGIN_RESPONSE", "FAILURE", "{}", "LOGIN FAILED")
			return
		}
		restClient := NewRabbitHTTPClient(restURL, &tls.Config{})
		info, err := restClient.BrokerInfo()
		fmt.Println(err)
		amqpDetails := StringifyRabbitmqDetails(&info)
		UIRespond("LOGIN_RESPONSE", "SUCCESS", amqpDetails, "")
	})

	// Load HTML.
	// You may also use `data:text/html,<base64>` approach to load initial HTML,
	// e.g: ui.Load("data:text/html," + url.PathEscape(html))
	ln, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		log.Fatal(err)
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

	log.Println("exiting...")
}
