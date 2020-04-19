package mappers

import (
	"taskmanager/app/models/entity"

	"fmt"
	"database/sql"
	_ "github.com/lib/pq"
)

type ProjectMapper struct {
	db *sql.DB
}

func (m *ProjectMapper) Init(db *sql.DB) error {
	m.db = db
	return nil
}

//получение списка проектов
func (m *ProjectMapper) GetAll() (*[]entity.Project, error) {
	fmt.Println("ProjectMapper.GetAll")

	projects := []entity.Project{}

	script := `select * from public.t_projects;`
	fmt.Println("script", script)

	//получение данных из базы
	data, err := m.db.Query(script)
	defer data.Close()
	if err != nil {
		fmt.Println("ExecErr", err)
		return nil, err
	}

	//извлечение данных в массив структур
	for data.Next() {
		project := entity.Project{}

		err := data.Scan(&project.Id, &project.Name, &project.Description)
		if err != nil {
			fmt.Println("ScanErr", err)
			return nil, err
		}

		fmt.Println(project)
		projects = append(projects, project)
	}
	fmt.Println(projects)

	return &projects, nil
}

//добавление проекта
func (m *ProjectMapper) Add (project *entity.Project) error {
	fmt.Println("ProjectMapper.Add ", project)

	script :=	`insert into public.t_projects(
				c_name, c_description)
				values ($1, $2)
				returning c_id;`
	fmt.Println("script", script)

	data, err := m.db.Query(script, project.Name, project.Description)
	if err != nil {
		fmt.Println("ExecErr ", err)
		return err
	}
	
	for data.Next() {
		err = data.Scan(&project.Id)
		if err != nil {
			fmt.Println("ScanErr", err)
			return err
		}
	}
	fmt.Println(project)

	return nil
}

//изменение проекта
func (m *ProjectMapper) Change (project *entity.Project) error {
	fmt.Println("ProjectMapper.Change ", project)

	script :=	`update public.t_projects
				set c_name=$1, c_description=$2
				where c_id=$3;`
	fmt.Println("script ", script)

	_, err := m.db.Exec(script, project.Name, project.Description, project.Id)
	if err != nil {
		fmt.Println("ExecErr ", err)
		return err
	}
	
	return nil
}

//удаление проекта
func (m *ProjectMapper) Delete (id string) error {
	fmt.Println("ProjectMapper.Delete ", id)

	script :=	`delete FROM public.t_projects
				where c_id = $1;`
	fmt.Println("script", script)

	_, err := m.db.Exec(script, id)
	if err != nil {
		fmt.Println("ExecErr ", err)
		return err
	}

	return nil
}