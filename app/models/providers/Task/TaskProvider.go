package Task

import (
	"taskmanager/app/models/entity"
	"taskmanager/app/models/mappers"

	"fmt"
	"database/sql"
	_ "github.com/lib/pq"
)

type TaskProvider struct {
	mapper *mappers.TaskMapper
	db *sql.DB
}

func (p *TaskProvider) Init(db *sql.DB) error {
	p.mapper = new(mappers.TaskMapper)
	p.mapper.Init(db)
	return nil
}

//получение списка статусов
func (p *TaskProvider) GetTaskStatusList() (*[]entity.TaskStatus, error) {
	fmt.Println("TaskProvider.GetTaskStatusList")

	taskStatusList, _ := p.mapper.GetTaskStatusList()
	return taskStatusList, nil
}

//получение списка проектов
func (p *TaskProvider) GetAll (id string) (*[]entity.Task, error) {
	fmt.Println("TaskProvider.GetAll ", id)

	tasks, _ := p.mapper.GetAll(id)
	return tasks, nil
}

//добавление задачи
func (p *TaskProvider) Add (task *entity.Task, projectId string) error {
	fmt.Println("TaskProvider.Add ", task, projectId)

	p.mapper.Add(task, projectId)
	return nil
}

//изменение задачи
func (p *TaskProvider) Change (task *entity.Task) error {
	fmt.Println("taskProvider.Change ", task)

	p.mapper.Change(task)
	return nil
}

//удаление задачи
func (p *TaskProvider) Delete (id string) error {
	fmt.Println("TaskProvider.Delete", id)

	p.mapper.Delete(id)
	return nil
}