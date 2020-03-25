package controllers

import (
	"taskmanager/app/models/providers/Employee"
	//"taskmanager/app/models/entity"
	
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
	connStr := "host=localhost port=5432 user=postgres password=123 dbname=testDatabase sslmode=disable"
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