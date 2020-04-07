package mappers

import (
	"taskmanager/app/models/entity"

	"fmt"
	"database/sql"
	_ "github.com/lib/pq"
)

type GroupMapper struct {
	db *sql.DB
}

func (m *GroupMapper) Init(db *sql.DB) error {
	m.db = db
	return nil
}

func (m *GroupMapper) GetById (projectId string) (*[]entity.Employee, error) {
	fmt.Println("GroupMapper.Add ", projectId)

	script := `
	SELECT t_employee.c_id, t_employee.c_name, t_employee.c_surname
	FROM t_employee, t_project_employee m
	WHERE m.fk_project = $1 AND t_employee.c_id = m.fk_employee;`
	fmt.Println("script", script)

	data, err := m.db.Query(script, projectId)
	if err != nil {
		fmt.Println("ExecErr ", err)
		return nil, err
	}

	group := []entity.Employee{}

	for data.Next() {
		employee := entity.Employee{}

		err := data.Scan(&employee.Id, &employee.Name, &employee.Surname)
		if err != nil {
			fmt.Println("ScanErr", err)
			return nil, err
		}

		fmt.Println(employee)
		group = append(group, employee)
	}
	fmt.Println(group)

	return &group, nil
}

func (m *GroupMapper) Add (projectId, employeeId string) error {
	fmt.Println("GroupMapper.Add ", projectId, employeeId)

	script := `
	INSERT INTO t_project_employee
	(fk_project, fk_employee)
	VALUES ($1, $2)`
	fmt.Println("script", script)

	_, err := m.db.Exec(script, projectId, employeeId)
	if err != nil {
		fmt.Println("ExecErr ", err)
		return err
	}

	return nil
}

func (m *GroupMapper) Remove (projectId, employeeId string) error {
	fmt.Println("GroupMapper.Remove ", employeeId, projectId)

	script := `
	DELETE FROM t_project_employee
	WHERE fk_project = $1 AND fk_employee = $2`
	fmt.Println("script", script)

	_, err := m.db.Exec(script, projectId, employeeId)
	if err != nil {
		fmt.Println("ExecErr ", err)
		return err
	}

	return nil
}