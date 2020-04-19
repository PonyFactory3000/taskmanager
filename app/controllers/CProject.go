package controllers

import (
	"taskmanager/app/models/providers/Project"
	"taskmanager/app/models/entity"
	"taskmanager/app/helpers"
	
	"fmt"
	//"log"
	//"encoding/json"
	//"database/sql"
	_ "github.com/lib/pq"

	"github.com/revel/revel"
	"github.com/revel/revel/cache"
)

type CProject struct {
	*revel.Controller
	provider Project.ProjectProvider
	//db *sql.DB
}

//интерцептор для подключения к БД
func init() {
	revel.InterceptMethod((*CProject).BdConnOpen, revel.BEFORE)
	//revel.InterceptMethod((*CProject).BdConnClose, revel.AFTER)
}

//подключение к базе
func (c *CProject) BdConnOpen() revel.Result {
	fmt.Println("BdConnCreate")

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

	// connStr := "host=localhost port=5432 user=postgres password=123 dbname=taskmanager sslmode=disable"
	// var err error
	// c.db, err = sql.Open("postgres", connStr)
	// if err != nil {
	// 	fmt.Println("OpenDB error", err)
	// 	return nil
	// }
	c.provider.Init(user.DB)
	return nil
}

//закрытие подключения
// func (c *CProject) BdConnClose() revel.Result {
// 	fmt.Println("BdConnDestroy")
// 	c.db.Close()
// 	return nil
// }


//получить список проектов
func (c *CProject) GetAll() revel.Result {
	fmt.Println("CProject.GetAll")

	projects, _ := c.provider.GetAll()

	return c.RenderJSON(helpers.Success(&projects))
}

//добавить проект
func (c *CProject) Add() revel.Result {
	fmt.Println("CProject.Add")

	//чтение тела запроса в структуру
	project := entity.Project{}
	c.Params.BindJSON(&project)
	fmt.Println("project ", project)

	c.provider.Add(&project)

	return c.RenderJSON(helpers.Success(&project))
}

//изменить проект
func (c *CProject) Change() revel.Result {
	fmt.Println("CProject.Change")
	
	project := entity.Project{}
	c.Params.BindJSON(&project)
	fmt.Println("project ", project)

	c.provider.Change(&project)

	return c.RenderJSON(helpers.Success(&project))
}

//удалить проект
func (c *CProject) Delete() revel.Result {
	fmt.Println("CProject.Delete")

	id := c.Params.Route.Get("id")
	c.provider.Delete(id)

	return c.RenderJSON(helpers.Success(id))
}