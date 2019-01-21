package main

import (
	"fmt"
	"encoding/json"
)

//RabbitmqLoginDetails : server login details
type RabbitmqLoginDetails struct {
	Host string `json:"host"`
	Port string `json:"port"`
	Username string `json:"userName"`
	Password string `json:"password"`
}

//Rabbitmq : server details
type Rabbitmq struct {
	Exchanges []string `json:"exchanges"`
}

//ParseLoginDetails : parse login details
func ParseLoginDetails(str string) RabbitmqLoginDetails {
	var res RabbitmqLoginDetails
	if err := json.Unmarshal([]byte(str), &res); err != nil {
		fmt.Println(err);
	}
	return res 
}

//StringifyRabbitmqDetails : stringify server details
func StringifyRabbitmqDetails(emp *Rabbitmq) string {
	e, err := json.Marshal(emp)
	if err != nil {
		fmt.Println(err)
	}
	return string(e);
}

//UIRespond : send data to frontend
func UIRespond(resType string, status string, response string, err string) {
	str := fmt.Sprintf("response('%s', '%s', '%s', '%s')", resType, status, response, err);
	UIlog(str);
	ui.Eval(str);
}

//UIlog : log in browser
func UIlog(log string) {
	ui.Eval(fmt.Sprintf("console.log('Go: %s')", log))
}