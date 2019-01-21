package main

import (
	"fmt"

	"github.com/streadway/amqp"
)

// AmqpConnection : conn type
type AmqpConnection struct {
	connected  bool
	connection *amqp.Connection
}

// RabbitMqConnect : connect to rabbimq server
func RabbitMqConnect(amqpURL string) AmqpConnection {
	conn, err := amqp.Dial(amqpURL)
	if err != nil {
		UIlog(fmt.Sprintf("%s: %s", "FAILED TO CONNECT", err))
		return AmqpConnection{connection: nil, connected: false}
	}
	return AmqpConnection{connection: conn, connected: true}
}
