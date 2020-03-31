-- селекты для копирования в консоль

-- проекты
SELECT * FROM t_projects;

-- таски для любого проекта
SELECT t.c_id, t.c_name, t.c_description, s.c_name, c_status FROM t_tasks
WHERE c_id = 1;

-- сотрудники
SELECT * FROM t_emoloyee;

-- группа для любого проекта
SELECT t_employee.c_id, t_employee.c_name, t_employee.c_surname
FROM t_employee, t_project_employee m
WHERE m.fk_project = 1 AND t_employee.c_id = m.fk_employee;