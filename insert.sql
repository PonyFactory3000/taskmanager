-- добавление в базу некоторых данных заранее

-- projects
INSERT INTO t_projects
    (c_name, c_description)
    VALUES ('first', 'simple description');

INSERT INTO t_projects
    (c_name, c_description)
    VALUES ('second', 'else simple description');

-- tasks
INSERT INTO t_tasks
    (c_name, c_description,
    fk_project, fk_status)
    VALUES ('task 1 1', 'simple task description', 1, 1);

INSERT INTO t_tasks
    (c_name, c_description,
    fk_project, fk_status)
    VALUES ('task 1 2', 'else simple task description', 1, 1);

INSERT INTO t_tasks
    (c_name, c_description,
    fk_project, fk_status)
    VALUES ('task 2 1', 'another simple task description', 2, 1);

INSERT INTO t_tasks
    (c_name, c_description,
    fk_project, fk_status)
    VALUES ('task 2 2', 'simple task description too', 2, 1);

INSERT INTO t_tasks
    (c_name, c_description,
    fk_project, fk_status)
    VALUES ('task 2 3', 'another one simple task description', 2, 1);

-- employee
INSERT INTO t_employee
    (c_name, c_surname, c_post,
    c_login, c_password)
    VALUES ('', '', '', '', '');

--group
INSERT INTO t_project_employee
    (fk_project, fk_employee)
    VALUES (1, 1);

INSERT INTO t_project_employee
    (fk_project, fk_employee)
    VALUES (1, 2);

INSERT INTO t_project_employee
    (fk_project, fk_employee)
    VALUES (2, 3);

INSERT INTO t_project_employee
    (fk_project, fk_employee)
    VALUES (2, 2);