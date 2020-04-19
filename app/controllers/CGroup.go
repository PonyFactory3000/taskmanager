package controllers

import (
	"taskmanager/app/models/providers/Group"
	"taskmanager/app/models/entity"
	"taskmanager/app/helpers"
	
	"fmt"
	// "log"
	// "encoding/json"
	//"database/sql"
	_ "github.com/lib/pq"

	"github.com/revel/revel"
	"github.com/revel/revel/cache"
)

type CGroup struct {
	*revel.Controller
	provider Group.GroupProvider
	//db *sql.DB
}

//интерцептор для подключения к БД
func init() {
	revel.InterceptMethod((*CGroup).BdConnOpen, revel.BEFORE)
	//revel.InterceptMethod((*CGroup).BdConnClose, revel.AFTER)
}

//подключение к базе
func (c *CGroup) BdConnOpen() revel.Result {
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
// func (c *CGroup) BdConnClose() revel.Result {
// 	fmt.Println("BdConnDestroy")
// 	c.db.Close()
// 	return nil
// }

//получить список id сотрудников
func (c *CGroup) GetById() revel.Result {
	fmt.Println("CGroup.GetAll")

	projectId := c.Params.Route.Get("projectId")
	group, _ := c.provider.GetById(projectId)

	return c.RenderJSON(helpers.Success(&group))
}

//добавить сотрудника в группу
func (c *CGroup) Add() revel.Result {
	fmt.Println("CGroup.Add")

	projectId := c.Params.Route.Get("projectId")
	employeeId := c.Params.Route.Get("employeeId")
	c.provider.Add(projectId, employeeId)

	return c.RenderJSON(helpers.Success("success"))
}

//убрать сотрудника из группы
func (c *CGroup) Remove() revel.Result {
	fmt.Println("CGroup.Remove")

	projectId := c.Params.Route.Get("projectId")
	employeeId := c.Params.Route.Get("employeeId")
	c.provider.Remove(projectId, employeeId)

	return c.RenderJSON(helpers.Success("success"))
}