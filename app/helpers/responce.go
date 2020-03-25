package helpers

type ResultState uint8

const (
	success ResultState = 0
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