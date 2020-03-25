package mappers

import (
	//"taskmanager/app/models/entity"

	//"fmt"
	"database/sql"
	_ "github.com/lib/pq"
)

type EmployeeMapper struct {
	db *sql.DB
}

func (m *EmployeeMapper) Init(db *sql.DB) error {
	m.db = db
	return nil
}