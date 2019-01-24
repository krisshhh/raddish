package main

import (
	"fmt"
)

var rabbitmq *Rabbitmq

// RequestHandler handles ui requests
func RequestHandler(reqID string, reqType string, content string) {
	UILog(fmt.Sprintf("%s:%s", reqID, reqType))
	switch reqType {
	case "START":
		rabbitmq = NewRabbitmq()
	case "LOGIN":
		loginHandler(reqID, content)
	default:
		fmt.Println("Invalid Request")
	}
}

func loginHandler(resID string, str string) {
	details := ParseLoginDetails(str)
	UILog("got details")
	// connect to rabbitmq
	err := rabbitmq.Connect(details)
	if err != nil {
		UIRespond(resID, "LOGIN_RESPONSE", "FAILURE", "{}", fmt.Sprintf("%s", err))
	}
	brokerInfoJSON := StringifyRabbitmqDetails(&rabbitmq.brokerInfo)
	UIRespond(resID, "LOGIN_RESPONSE", "SUCCESS", brokerInfoJSON, "")
}
