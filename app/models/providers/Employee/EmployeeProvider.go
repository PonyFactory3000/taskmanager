package Employee

import (
	//"taskmanager/app/models/entity"
	"taskmanager/app/models/mappers"

	//"fmt"
	"database/sql"
	_ "github.com/lib/pq"
)

type EmployeeProvider struct {
	mapper *mappers.EmployeeMapper
	db *sql.DB
}

func (p *EmployeeProvider) Init(db *sql.DB) error {
	p.mapper = new(mappers.EmployeeMapper)
	p.mapper.Init(db)
	return nil
}