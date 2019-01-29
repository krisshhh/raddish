package main

import (
	"fmt"

	uuid "github.com/satori/go.uuid"
)

var rabbitmq *Rabbitmq
var subscriptions map[string](*chan bool)

// RequestHandler handles ui requests
func RequestHandler(reqID string, reqType string, content string) {
	// UILog(fmt.Sprintf("%s:%s", reqID, reqType))
	switch reqType {
	case "START":
		rabbitmq = NewRabbitmq()
		subscriptions = make(map[string](*chan bool))
	case "LOGIN":
		go loginHandler(reqID, content)
	case "GET_BROKERINFO":
		go updateBrokerInfo(reqID)
	case "SUBSCRIBE":
		go subscribe(reqID, content)
	// case "UNSUSCRIBE":
	// 	unSubscribe(reqID, content)
	default:
		fmt.Println("Invalid Request")
	}
}

func loginHandler(resID string, str string) {
	details := ParseLoginDetails(str)
	// connect to rabbitmq
	err := rabbitmq.Connect(details)
	if err != nil {
		UIRespond(resID, "LOGIN_RESPONSE", "FAILURE", "{}", fmt.Sprintf("%s", err))
	}
	brokerInfoJSON := StringifyRabbitmqDetails(&rabbitmq.brokerInfo)
	UIRespond(resID, "LOGIN_RESPONSE", "SUCCESS", brokerInfoJSON, "")
}

func updateBrokerInfo(resID string) {
	err := rabbitmq.UpdateBrokerInfo()
	if err != nil {
		UIRespond(resID, "GET_BROKERINFO_RESPONSE", "FAILURE", "{}", fmt.Sprintf("%s", err))
	}
	brokerInfoJSON := StringifyRabbitmqDetails(&rabbitmq.brokerInfo)
	UIRespond(resID, "GET_BROKERINFO_RESPONSE", "SUCCESS", brokerInfoJSON, "")
}

func newUUID(resID string) string {
	u, uerr := uuid.NewV4()
	if uerr == nil {
		return resID
	}
	return u.String()[:8]
}

func subscribe(resID string, queueName string) {
	jobID := newUUID(resID)
	kill := make(chan bool)
	msgs, err := rabbitmq.SubscribeToQueue(queueName)
	if err != nil {
		UIRespond(resID, "SUBSCRIBE_RESPONSE", "FAILURE", "{}", fmt.Sprintf("%s", err))
		return
	}
	subscriptions[jobID] = &kill
	UIRespond(resID, "SUBSCRIBE_RESPONSE", "SUCCESS", jobID, "{}")
	for d := range msgs {
		fmt.Println(d.Body)
	}
	<-kill
}

func unSubscribe(resID string, jobID string) {
	kill := *subscriptions[jobID]
	kill <- true
}
