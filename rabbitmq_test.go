package main

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestRabbitConnect(t *testing.T) {
	fmt.Println("Test start")
	rabbitmq := NewRabbitmq()
	loginDetails := RabbitmqLoginDetails{
		Host:     "127.0.0.1",
		Port:     "5672",
		Username: "guest",
		Password: "guest",
	}
	err := rabbitmq.Connect(loginDetails)
	assert.Nil(t, err)
	t.Log(rabbitmq.connected)
	assert.Equal(t, rabbitmq.connected, true)
	assert.Equal(t, rabbitmq.restClientExist, true)
}

func TestRabbitConnectFailure(t *testing.T) {
	fmt.Println("Test start")
	rabbitmq := NewRabbitmq()
	loginDetails := RabbitmqLoginDetails{
		Host:     "127.0.0.1",
		Port:     "5672",
		Username: "wrong_username",
		Password: "wrong_password",
	}
	err := rabbitmq.Connect(loginDetails)
	t.Log(err)
	assert.Equal(t, rabbitmq.connected, false)
	assert.Equal(t, rabbitmq.restClientExist, false)
}
