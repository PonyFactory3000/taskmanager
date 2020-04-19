package controllers

import (
	"taskmanager/app/models/providers/Task"
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

type CTask struct {
	*revel.Controller
	provider Task.TaskProvider
	//db *sql.DB
}

//интерцептор для подключения к БД
func init() {
	revel.InterceptMethod((*CTask).BdConnOpen, revel.BEFORE)
	//revel.InterceptMethod((*CTask).BdConnClose, revel.AFTER)
}

//подключение к базе
func (c *CTask) BdConnOpen() revel.Result {
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
// func (c *CTask) BdConnClose() revel.Result {
// 	fmt.Println("BdConnDestroy")
// 	c.db.Close()
// 	return nil
// }


//получить список статусов
func (c *CTask) GetTaskStatusList() revel.Result {
	fmt.Println("CTask.GetTaskStatusList")

	taskStatusList, _ := c.provider.GetTaskStatusList()
	return c.RenderJSON(helpers.Success(&taskStatusList))
}

//получить список задач
func (c *CTask) GetAll() revel.Result {
	fmt.Println("CTask.GetAll")

	id := c.Params.Route.Get("projectId")
	tasks, _ := c.provider.GetAll(id)

	return c.RenderJSON(helpers.Success(&tasks))
}

//добавить задачу
func (c *CTask) Add() revel.Result {
	fmt.Println("CTask.Add")

	task := entity.Task{}
	c.Params.BindJSON(&task)
	fmt.Println("task ", task)

	projectId := c.Params.Route.Get("projectId")
	fmt.Println("projectId ", projectId)

	c.provider.Add(&task, projectId)

	return c.RenderJSON(helpers.Success(&task))
}

//изменить задачу
func (c *CTask) Change() revel.Result {
	fmt.Println("CTask.Change")
	
	task := entity.Task{}
	c.Params.BindJSON(&task)
	fmt.Println("task ", task)

	c.provider.Change(&task)

	return c.RenderJSON(helpers.Success(&task))
}

//удалить задачу
func (c *CTask) Delete() revel.Result {
	fmt.Println("CTask.Delete")

	id := c.Params.Route.Get("id")
	c.provider.Delete(id)

	return c.RenderJSON(helpers.Success(id))
}