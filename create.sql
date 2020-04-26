-- \! chcp 1251 (нормальное отображение кириллицы в psql в cmd)
-- \i E:/go/src/taskmanager/create.sql (этот скрипт в psql) 
--
-- создание таблиц для бд и добавление дефолтных данных

CREATE TABLE t_projects
(
    c_id SERIAL PRIMARY KEY,
    c_name VARCHAR(30) NOT NULL,
    C_description VARCHAR(200)
);

CREATE TABLE t_ref_status
(
    c_id INTEGER PRIMARY KEY,
    c_name VARCHAR(30) NOT NULL,
    UNIQUE (c_name)
);

CREATE TABLE t_tasks
(
    c_id SERIAL PRIMARY KEY,
    fk_project INTEGER REFERENCES t_projects (c_id) ON DELETE CASCADE NOT NULL,
    fk_status VARCHAR(30) REFERENCES t_ref_status (c_name) ON DELETE CASCADE DEFAULT 'Новая',
    fk_employee INTEGER REFERENCES t_employee (c_id) ON DELETE SET NULL,
    c_name VARCHAR(30) NOT NULL,
    c_description VARCHAR(200)
);

CREATE TABLE t_employee
(
    c_id SERIAL PRIMARY KEY,
    c_name VARCHAR(30) NOT NULL,
    c_surname VARCHAR(30) NOT NULL,
    c_post VARCHAR(30) DEFAULT 'программист'
);

CREATE TABLE t_project_employee (
    c_id SERIAL PRIMARY KEY,
    fk_project INTEGER REFERENCES t_projects (c_id) ON DELETE CASCADE NOT NULL,
    fk_employee INTEGER REFERENCES t_employee (c_id) ON DELETE CASCADE NOT NULL
);

CREATE TABLE t_users
(
    c_id SERIAL PRIMARY KEY,
    c_login VARCHAR(30) NOT NULL,
    c_password VARCHAR(30) NOT NULL
)


-- список статусов старый
-- (добавляю в базу вручную потому что psql не понимает кириллицу)
-- INSERT INTO t_ref_status
--     (c_id, c_name)
--     VALUES (1, 'новая');
-- INSERT INTO t_ref_status
--     (c_id, c_name)
--     VALUES (2, 'назначена');
-- INSERT INTO t_ref_status 
--     (c_id, c_name)
--     VALUES (3, 'в работе');
-- INSERT INTO t_ref_status 
--     (c_id, c_name)
--     VALUES (4, 'отложена');
-- INSERT INTO t_ref_status 
--     (c_id, c_name)
--     VALUES (5, 'завершена');


-- список статусов новый
-- (добавляю в базу вручную потому что psql не понимает кириллицу)
-- INSERT INTO t_ref_status
--     (c_id, c_name)
--     VALUES (1, 'Новая');
-- INSERT INTO t_ref_status
--     (c_id, c_name)
--     VALUES (2, 'Назначена');
-- INSERT INTO t_ref_status 
--     (c_id, c_name)
--     VALUES (3, 'Отложена');
-- INSERT INTO t_ref_status 
--     (c_id, c_name)
--     VALUES (4, 'Завершена');
-- INSERT INTO t_ref_status 
--     (c_id, c_name)
--     VALUES (5, 'Отменена');