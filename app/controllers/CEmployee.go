package controllers

import (
	"taskmanager/app/models/providers/Employee"
	"taskmanager/app/models/entity"
	"taskmanager/app/helpers"
	
	"fmt"
	// "log"
	// "encoding/json"
	"database/sql"
	_ "github.com/lib/pq"

	"github.com/revel/revel"
)

type CEmployee struct {
	*revel.Controller
	provider Employee.EmployeeProvider
	db *sql.DB
}

//интерцептор для подключения к БД
func init() {
	revel.InterceptMethod((*CEmployee).BdConnOpen, revel.BEFORE)
	revel.InterceptMethod((*CEmployee).BdConnClose, revel.AFTER)
}

//подключение к базе
func (c *CEmployee) BdConnOpen() revel.Result {
	fmt.Println("BdConnCreate")
	connStr := "host=localhost port=5432 user=postgres password=123 dbname=taskmanager sslmode=disable"
	var err error
	c.db, err = sql.Open("postgres", connStr)
	if err != nil {
		fmt.Println("OpenDB error", err)
		return nil
	}
	c.provider.Init(c.db)
	return nil
}

//закрытие подключения
func (c *CEmployee) BdConnClose() revel.Result {
	fmt.Println("BdConnDestroy")
	c.db.Close()
	return nil
}

//получить список сотрудников
func (c *CEmployee) GetAll() revel.Result {
	fmt.Println("CEmployee.GetAll")

	employeeList, _ := c.provider.GetAll()

	return c.RenderJSON(helpers.Success(&employeeList))
}

//добавить сотрудника
func (c* CEmployee) Add() revel.Result {
	fmt.Println("CEmployee.Add")

	employee := entity.Employee{}
	c.Params.BindJSON(&employee)
	fmt.Println(employee)

	c.provider.Add(&employee)

	return c.RenderJSON(helpers.Success(&employee))
}

//изменить сотрудника
func (c* CEmployee) Change() revel.Result {
	fmt.Println("CEmployee.Change")

	employee := entity.Employee{}
	c.Params.BindJSON(&employee)
	fmt.Println(employee)

	c.provider.Change(&employee)

	return c.RenderJSON(helpers.Success(&employee))
}

//удалить сотрудника
func (c* CEmployee) Delete() revel.Result {
	fmt.Println("CEmployee.Delete")

	id := c.Params.Route.Get("id")
	c.provider.Delete(id)

	return c.RenderJSON(helpers.Success(id))
}

