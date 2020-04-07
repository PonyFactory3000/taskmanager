package Group

import (
	"taskmanager/app/models/entity"
	"taskmanager/app/models/mappers"

	"fmt"
	"database/sql"
	_ "github.com/lib/pq"
)

type GroupProvider struct {
	mapper *mappers.GroupMapper
	db *sql.DB
}

func (p *GroupProvider) Init(db *sql.DB) error {
	p.mapper = new(mappers.GroupMapper)
	p.mapper.Init(db)
	return nil
}

func (p *GroupProvider) GetById (projectId string) (*[]entity.Employee, error) {
	fmt.Println("GroupProvider.GetAll", projectId)

	group, _ := p.mapper.GetById(projectId)
	return group, nil
}

func (p *GroupProvider) Add (projectId, employeeId string) error {
	fmt.Println("GroupProvider.Add", projectId, employeeId)

	p.mapper.Add(projectId, employeeId)
	return nil
}

func (p *GroupProvider) Remove (projectId, employeeId string) error {
	fmt.Println("GroupProvider.Remove", projectId, employeeId)

	p.mapper.Remove(projectId, employeeId)
	return nil
}

