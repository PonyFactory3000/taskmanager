package Employee

import (
	"taskmanager/app/models/entity"
	"taskmanager/app/models/mappers"

	"fmt"
	"database/sql"
	_ "github.com/lib/pq"
)

type EmployeeProvider struct {
	mapper *mappers.EmployeeMapper
	//db *sql.DB
}

func (p *EmployeeProvider) Init(db *sql.DB) error {
	p.mapper = new(mappers.EmployeeMapper)
	p.mapper.Init(db)
	return nil
}

//получение списка сотрудников
func (p *EmployeeProvider) GetAll () (*[]entity.Employee, error) {
	fmt.Println("employeeProvider.GetAll")

	employeeList, _ := p.mapper.GetAll()
	return employeeList, nil
}

//добавление сотрудника
func (p *EmployeeProvider) Add (employee *entity.Employee) error {
	fmt.Println("employeeProvider.Add", employee)

	p.mapper.Add(employee)

	return nil
}

//изменение сотрудника
func (p *EmployeeProvider) Change (employee *entity.Employee) error {
	fmt.Println("employeeProvider.Change", employee)

	p.mapper.Change(employee)

	return nil
}

//удаление сотрудника
func (p *EmployeeProvider) Delete (id string) error {
	fmt.Println("employeeProvider.Delete", id)

	p.mapper.Delete(id)

	return nil
}