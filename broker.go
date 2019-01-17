package main

import (
	"fmt"
	"encoding/json"
)

type RabbitmqLoginDetails struct {
	Host string `json:"host"`
	Port string `json:"port"`
	Username string `json:"userName"`
	Password string `json:"password"`
}

type Rabbitmq struct {
	Exchanges []string `json:"exchanges"`
}

func ParseLoginDetails(str string) RabbitmqLoginDetails {
	var res RabbitmqLoginDetails
	if err := json.Unmarshal([]byte(str), &res); err != nil {
		fmt.Println(err);
	}
	return res 
}

func StringifyRabbitmqDetails(emp *Rabbitmq) string {
	e, err := json.Marshal(emp)
	if err != nil {
		fmt.Println(err)
	}
	return string(e);
}

func Respond(resType string, response string) string {
	return fmt.Sprintf("response('%s', '%s')", resType, response)
}