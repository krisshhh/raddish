package main

import (
	"testing"
)

func TestLoginHandler(t *testing.T) {
	go func() {
		RequestHandler("0", "START", "")
		RequestHandler("1", "LOGIN", `{"host":"127.0.0.1","password":"guest","port":"5672","userName":"guest"}`)
	}()
}
