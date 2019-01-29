package main

import (
	"fmt"
	"crypto/tls"
	"github.com/streadway/amqp"
	"github.com/jandelgado/rabtap/pkg"
)

// Rabbitmq : conn type
type Rabbitmq struct {
	connected  			bool
	connection 			*amqp.Connection
	restClientExist 	bool
	restClient 			*rabtap.RabbitHTTPClient
	brokerInfo 			rabtap.BrokerInfo
}

// NewRabbitmq expose rabbitmq functionality
func NewRabbitmq() *Rabbitmq {
	return &Rabbitmq {
		connected:		 	false,
		restClientExist:	false,
	}
}

// Connect establish connection to rabbitmq
func (rabbitmq *Rabbitmq) Connect(det RabbitmqLoginDetails) error {
	amqpURL := fmt.Sprintf("amqp://%s:%s@%s:%s", det.Username, det.Password, det.Host, det.Port)
	restURL := fmt.Sprintf("http://%s:%s@%s:%s/api", det.Username, det.Password, det.Host, "15672")
	conn, err := amqp.Dial(amqpURL)
	if err != nil {
		rabbitmq.connected = false;
		return err
	}
	rabbitmq.connected = true;
	rabbitmq.connection = conn;
	if err := rabbitmq.RestClient(restURL); err != nil {
		return err;
	}
	return nil;
}

// RestClient connect to rabbitmq rest client for broker info
func (rabbitmq *Rabbitmq) RestClient(restClientURL string) error {
	rabbitmq.restClient = rabtap.NewRabbitHTTPClient(restClientURL, &tls.Config{})
	if err := rabbitmq.UpdateBrokerInfo(); err != nil {
		return err
	}
	return nil
}

// UpdateBrokerInfo update broker info for updated exchanges channels and queues values
func (rabbitmq *Rabbitmq) UpdateBrokerInfo() error {
	brokerInfo, err := rabbitmq.restClient.BrokerInfo();
	if err != nil {
		return err
	}
	rabbitmq.brokerInfo = brokerInfo
	rabbitmq.restClientExist = true
	return nil;
}
 
// SubscribeToQueue sub to queue
func (rabbitmq *Rabbitmq) SubscribeToQueue(queueName string) (<-chan amqp.Delivery, error) {
	channel, err := rabbitmq.connection.Channel()
	if err != nil {
		return nil, err
	}
	msgs, err := channel.Consume(queueName, "RADISH", false, false, false, false, nil)
	if err != nil {
		return nil, err
	}
	return msgs, nil
}
