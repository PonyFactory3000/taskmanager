package Project

import (
	"taskmanager/app/models/entity"
	"taskmanager/app/models/mappers"

	"fmt"
	"database/sql"
	_ "github.com/lib/pq"
)

type ProjectProvider struct {
	mapper *mappers.ProjectMapper
	db *sql.DB
}

func (p *ProjectProvider) Init(db *sql.DB) error {
	p.mapper = new(mappers.ProjectMapper)
	p.mapper.Init(db)
	return nil
}

//получение списка проектов
func (p *ProjectProvider) GetAll () (*[]entity.Project, error) {
	fmt.Println("projectProvider.GetAll")

	projects, _ := p.mapper.GetAll()
	return projects, nil
}

//добавление проекта
func (p *ProjectProvider) Add (project *entity.Project) error {
	fmt.Println("projectProvider.Add ", project)

	p.mapper.Add(project)
	return nil
}

//изменение проекта
func (p *ProjectProvider) Change (project *entity.Project) error {
	fmt.Println("projectProvider.Change ", project)

	p.mapper.Change(project)
	return nil
}

//удаление проекта
func (p *ProjectProvider) Delete (id string) error {
	fmt.Println("ProjectProvider.Delete", id)

	p.mapper.Delete(id)
	return nil
}

