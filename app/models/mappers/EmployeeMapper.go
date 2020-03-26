package mappers

import (
	"taskmanager/app/models/entity"

	"fmt"
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

//получение списка сотрудников
func (m *EmployeeMapper) GetAll() (*[]entity.Employee, error) {
	fmt.Println("EmployeeMapper.GetAll")

	employeeList := []entity.Employee{}

	script :=	`SELECT * FROM public.t_employee;`
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
		employee := entity.Employee{}

		err := data.Scan(&employee.Id, &employee.Name, &employee.Surname, &employee.Age, &employee.Post)
		if err != nil {
			fmt.Println("ScanErr", err)
			return nil, err
		}

		fmt.Println(employee)
		employeeList = append(employeeList, employee)
	}
	fmt.Println(employeeList)

	return &employeeList, nil
}

//добавление сотрудника
func (m *EmployeeMapper) Add(employee *entity.Employee) error {
	fmt.Println("EmployeeMapper.Add", employee)

	script :=	`insert into public.t_employee(
				"name", "surname", "age", "post")
				values ($1, $2, $3, $4)
				returning "id";`
	fmt.Println("script", script)

	data, err := m.db.Query(script, employee.Name, employee.Surname, employee.Age, employee.Post)
	if err != nil {
		fmt.Println("ExecErr ", err)
		return err
	}

	for data.Next() {
		err = data.Scan(&employee.Id)
		if err != nil {
			fmt.Println("ScanErr", err)
			return err
		}
	}
	fmt.Println(employee)

	return nil
}

//изменение сотрудника
func (m *EmployeeMapper) Change(employee *entity.Employee) error {
	fmt.Println("EmployeeMapper.Add", employee)

	script :=	`update public.t_employee
				set "name" = $1, "surname" = $2, "age" = $3, "post" = $4
				where "id" = $5`
	fmt.Println("script", script)

	_, err := m.db.Exec(script, employee.Name, employee.Surname, employee.Age, employee.Post, employee.Id)
	if err != nil {
		fmt.Println("ExecErr ", err)
		return err
	}

	return nil
}

//удаление сотрудника
func (m *EmployeeMapper) Delete(id string) error {
	fmt.Println("EmployeeMapper.Add", id)

	script :=	`delete from public.t_employee
				where "id" = $1`
	fmt.Println("script", script)

	_, err := m.db.Exec(script, id)
	if err != nil {
		fmt.Println("ExecErr", err)
		return err
	}

	return nil
}