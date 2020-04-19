package mappers

import (
	"taskmanager/app/models/entity"

	"fmt"
	"database/sql"
	_ "github.com/lib/pq"
)

type AuthMapper struct {
	db *sql.DB
}

func (m *AuthMapper) Init(db *sql.DB) error {
	m.db = db
	return nil
}

func (m *AuthMapper) Auth(user *entity.User) (bool, error) {
	fmt.Println("AuthMapper.Auth", user)

	script :=	`SELECT c_password FROM t_users
				WHERE c_login = $1`
	fmt.Println("script", script)
	fmt.Println(user)

	data, err := m.db.Query(script, user.Login)
	if err != nil {
		fmt.Println("ExecErr ", err)
		return false, err
	}

	var password string
	for data.Next() {
		err = data.Scan(&password)
		if err != nil {
			fmt.Println("ScanErr", err)
			return false, err
		}
	}

	fmt.Println("password, user   ", password, "   ", user)
	if (user.Password == password && password != "")   {
		return true, nil
	}
	return false, nil
}