package entity

import (
	"database/sql"
)

type User struct {
	Id int64
	Login string
	Password string
	Token string
	DB *sql.DB
}