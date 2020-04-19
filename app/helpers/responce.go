package helpers

import (
	"fmt"
)

type ResultState uint8

const (
	success ResultState = 0
	failed ResultState = 1
)

type Response struct {
	Result    ResultState
	Data      interface{}
	ErrorText string
}

func Success(data interface{}) Response {
	return Response{
		Result: success,
		Data: data,
		ErrorText: "",
	}
}

func Failed(data interface{}) Response {
	return Response{
		Result: failed,
		Data: nil,
		ErrorText: fmt.Sprintf("%v", data),
	}
}