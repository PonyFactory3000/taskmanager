package helpers

// import (
// 	"fmt"
// 	"database/sql"
// 	_ "github.com/lib/pq"
// 	"taskmanager/app/models/entity"
// )

// func CheckUser() (*sql.DB, error) {
// 	user := entity.User{}
// 	token, err := c.Session.Get("Token")
// 	if err != nil {
// 		return c.RenderJSON(helpers.Failed(err))
// 	}
// 	user.Token = fmt.Sprintf("%v", token)
	
// 	//получение подключения по токену
// 	err = cache.Get("Token_"+user.Token, &user);
// 	if err != nil {
// 		return c.RenderJSON(helpers.Failed(err))
// 	}
// }