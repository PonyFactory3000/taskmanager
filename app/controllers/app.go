package controllers

import (
	"github.com/revel/revel"

	"taskmanager/app/models/providers/Auth"
	"taskmanager/app/models/entity"
	"fmt"
	"taskmanager/app/helpers"
	"github.com/revel/revel/cache"
	"time"
)

type App struct {
	*revel.Controller
	AuthProvider Auth.AuthProvider
}

func (c App) Index() revel.Result {
	return c.Render()
}

func (c App) Login() revel.Result {	
	return c.Render()
}

//авторизация
func (c App) Auth() revel.Result {
	fmt.Println("CApp.Auth")

	//экземпляр пользователя
	user := entity.User{}
	//получаем логин и пароль
	c.Params.BindJSON(&user)

	//проверка логина и пароля в бд
	err := c.AuthProvider.Auth(&user)
	//ошибка
	if err != nil {
		return c.RenderJSON(helpers.Failed(err))
	}
	//неверный пароль
	if user.Token == "" {
		return c.RenderJSON(helpers.Failed("Неверный логин или пароль"))
	}

	//сохранение токена и подключения
	go cache.Set("Token_"+user.Token, user, 120*time.Minute)
	c.Session["Token"] = user.Token

	//редирект на стороне клиента
	return c.RenderJSON(helpers.Success(""))
}

//выход
func (c *App) Logout() revel.Result {
	fmt.Println("CApp.Logout")

	//получение токена
	user := entity.User{}
	token, err := c.Session.Get("Token")
	if err != nil {
		return c.RenderJSON(helpers.Failed(err))
	}
	user.Token = fmt.Sprintf("%v", token)

	//получение подключения по токену
	err = cache.Get("Token_"+user.Token, &user);
	if err != nil {
		return c.RenderJSON(helpers.Failed(err))
	}

	//Закрыть подключение
	user.DB.Close()

	//Удалить кеш и сессии связанные с пользователем
	go cache.Delete("Token_" + user.Token)
	delete(c.Session, "Token")

	return c.RenderJSON(helpers.Success(""))
}