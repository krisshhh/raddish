//go:generate go run -tags generate gen.go

package main

import (
	"fmt"
	"log"
	"net"
	"net/http"
	"os"
	"os/signal"
	"runtime"
	"encoding/json"
	"github.com/zserge/lorca"
)

// Go types that are bound to the UI must be thread-safe, because each binding
// is executed in its own goroutine. In this simple case we may use atomic
// operations, but for more complex cases one should use proper synchronization.
type RabbitmqLoginDetails struct {
	Host string `json:"host"`
	Port string `json:"port"`
	Username string `json:"userName"`
	Password string `json:"password"`
}

type Rabbitmq struct {
	Exchanges []string `json:"exchanges"`
}

func main() {
	args := []string{}
	if runtime.GOOS == "linux" {
		args = append(args, "--class=Lorca")
	}
	ui, err := lorca.New("", "", 900, 650, args...)
	if err != nil {
		log.Fatal(err)
	}
	defer ui.Close()

	uilog := func (str string) {
		ui.Eval(fmt.Sprintf("console.log('%s')", str));
	}

	parseLoginDetails := func (str string) RabbitmqLoginDetails {
		var res RabbitmqLoginDetails
		if err := json.Unmarshal([]byte(str), &res); err != nil {
			fmt.Println(err);
		}
		return res 
	}
	
	stringify := func (emp *Rabbitmq) string {
		e, err := json.Marshal(emp)
		if err != nil {
			fmt.Println(err)
		}
		return string(e);
	}

	// A simple way to know when UI is ready (uses body.onload event in JS)
	ui.Bind("start", func() {
		log.Println("UI is ready")
	})

	ui.Bind("Login", func(str string) {
		uilog(str);
		det := parseLoginDetails(str);
		fmt.Println(det)

		// connect to rabbitmq

		emp := &Rabbitmq{Exchanges: []string{"amp.fanout"}}
		ui.Eval(fmt.Sprintf(`onLogin('%s')`, stringify(emp)))
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
