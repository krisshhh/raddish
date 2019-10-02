package main

import (
	"context"
	"crypto/tls"
	"net/url"
	"fmt"
	"github.com/streadway/amqp"
	"github.com/jandelgado/rabtap/pkg"
	"github.com/sirupsen/logrus"
)

var log = logrus.New()

// Rabbitmq : conn type
type Rabbitmq struct {
	amqpURL				string
	restURL				string
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
	rabbitmq.amqpURL = fmt.Sprintf("amqp://%s:%s@%s:%s", det.Username, det.Password, det.Host, det.Port)
	rabbitmq.restURL = fmt.Sprintf("http://%s:%s@%s:%s/api", det.Username, det.Password, det.Host, "15672")
	conn, err := amqp.Dial(rabbitmq.amqpURL)
	if err != nil {
		rabbitmq.connected = false;
		return err
	}
	rabbitmq.connected = true;
	rabbitmq.connection = conn;
	if err := rabbitmq.RestClient(rabbitmq.restURL); err != nil {
		return err;
	}
	return nil;
}

// RestClient connect to rabbitmq rest client for broker info
func (rabbitmq *Rabbitmq) RestClient(restClientURL string) error {
	url, err := url.Parse(restClientURL)
	if err != nil {
		return err
	}
	rabbitmq.restClient = rabtap.NewRabbitHTTPClient(url, &tls.Config{})
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

// create new tap on given exchange and bindingkey
func (rabbitmq *Rabbitmq)  NewTap(exchange string, bindingKey string) {
	done := make(chan bool)
	receiveFunc := func(message rabtap.TapMessage) error {
		log.Debug("received message on tap: #+v", message)
		if string(message.AmqpMessage.Body) == "Hello" {
			done <- true
		}
		return nil
	}

	exchangeConfig := []rabtap.ExchangeConfiguration{{	
		Exchange: exchange,
		BindingKey: bindingKey,
	}}

	tapConfig := []rabtap.TapConfiguration{{
		AmqpURI: rabbitmq.amqpURL,
		Exchanges: exchangeConfig,
	}}

	ctx, cancel := context.WithCancel(context.Background())
	go CreateNewTap(ctx, tapConfig, &tls.Config{}, receiveFunc)
	cancel() 
}
