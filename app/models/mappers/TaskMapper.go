package mappers

import (
	"taskmanager/app/models/entity"

	"fmt"
	"database/sql"
	_ "github.com/lib/pq"
)

type TaskMapper struct {
	db *sql.DB
}

func (m *TaskMapper) Init(db *sql.DB) error {
	m.db = db
	return nil
}

//получение списка статусов
func (m *TaskMapper) GetTaskStatusList() (*[]entity.TaskStatus, error) {
	fmt.Println("TaskMapper.GetTaskStatusList")

	statusList := []entity.TaskStatus{}

	script :=	`select * from public.t_task_status`
	fmt.Println(script)

	data, err := m.db.Query(script)
	defer data.Close()
	if err != nil {
		fmt.Println("ExecErr", err)
		return nil, nil
	}

	for data.Next() {
		status := entity.TaskStatus{}

		err = data.Scan(&status.Id, &status.Name)
		if err != nil {
			fmt.Println("ScanErr", err)
			return nil, nil
		}

		fmt.Println(status)
		statusList = append(statusList, status)
	}

	return &statusList, nil
}

//получение списка тасков
func (m *TaskMapper) GetAll(id string) (*[]entity.Task, error) {
	fmt.Println("TaskMapper.GetAll", id)

	tasks := []entity.Task{}

	script :=	`select 
				"id", "name", "description"
				from public.t_tasks
				where "fk_project" = $1`
	fmt.Println("script", script, id)

	//получение данных из базы
	data, err := m.db.Query(script, id)
	defer data.Close()
	if err != nil {
		fmt.Println("ExecErr", err)
		return nil, err
	}

	//извлечение данных в массив структур
	for data.Next() {
		task := entity.Task{}

		err := data.Scan(&task.Id, &task.Name, &task.Description)
		if err != nil {
			fmt.Println("ScanErr", err)
			return nil, err
		}

		fmt.Println(task)
		tasks = append(tasks, task)
	}
	fmt.Println(tasks)

	return &tasks, nil
}

//добавление таски
func (m *TaskMapper) Add (task *entity.Task, projectId string) error {
	fmt.Println("TaskMapper.Add ", task)

	script :=	`insert into public.t_tasks(
				"name", "description",
				"fk_project", "fk_status")
				values ($1, $2, $3, $4)
				returning "id";`
	fmt.Println("script", script)

	data, err := m.db.Query(script, task.Name, task.Description, projectId, 1)
	if err != nil {
		fmt.Println("ExecErr ", err)
		return err
	}
	
	for data.Next() {
		err = data.Scan(&task.Id)
		if err != nil {
			fmt.Println("ScanErr", err)
			return err
		}
	}
	fmt.Println(task)

	return nil
}

//изменение задачи
func (m *TaskMapper) Change (task *entity.Task) error {
	fmt.Println("TaskMapper.Change ", task)

	script :=	`update public.t_tasks
				set "name"=$1, "description"=$2
				where "id"=$3;`
	fmt.Println("script ", script)

	_, err := m.db.Exec(script, task.Name, task.Description, task.Id)
	if err != nil {
		fmt.Println("ExecErr ", err)
		return err
	}
	
	return nil
}

//удаление задачи
func (m *TaskMapper) Delete (id string) error {
	fmt.Println("TaskMapper.Delete ", id)

	script :=	`delete from public.t_tasks
				where "id" = $1;`
	fmt.Println("script", script)

	_, err := m.db.Exec(script, id)
	if err != nil {
		fmt.Println("ExecErr ", err)
		return err
	}

	return nil
}