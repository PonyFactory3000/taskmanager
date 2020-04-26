package entity

import (
	. "database/sql"
)

type Task struct {
	Id int64
	//Project int64
	Name string
	Description string
	Status string
	EmployeeId NullInt64
	EmployeeName NullString
	EmployeeSurname NullString
}