package Auth

import (
	"taskmanager/app/models/entity"
	"taskmanager/app/models/mappers"

	"crypto/rand"
	"fmt"
	"database/sql"
	_ "github.com/lib/pq"
)

type AuthProvider struct {
	mapper *mappers.AuthMapper
	db *sql.DB
	// user *entity.User
}

//авторизация
func (p *AuthProvider) Auth (user *entity.User) error {
	fmt.Println("AuthProvider.Auth")

	//создание подключения
	user.DB = BdConn()
	p.mapper = new(mappers.AuthMapper)
	p.mapper.Init(user.DB)

	//проверка логина и пароля в бд
	res, err := p.mapper.Auth(user)
	//ошибка
	if err != nil {
		fmt.Println("ExecErr ", err)
		return err
	}
	//неверный пароль
	if res == false {
		user.Token = ""
		return nil
	}

	//генерация токена
	token := newToken()
	user.Token = token
	fmt.Println("newToken  ", token)

	return nil
}

//функция генерирующая рандомный токен
func newToken() string {
	b := make([]byte, 16)
	rand.Read(b)
	//преобразование в строку
	return fmt.Sprintf("%x", b)
}

//создание подключения
func BdConn() *sql.DB {
	fmt.Println("BdConn")
	connStr := "host=localhost port=5432 user=postgres password=123 dbname=taskmanager sslmode=disable"

	db, err := sql.Open("postgres", connStr)
	if err != nil {
		fmt.Println("OpenDB error", err)
		return nil
	}
	return db
}