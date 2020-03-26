let projectModel = {

    //получение списка проектов
    GetAll(){
        let url = '/project'
        let method = 'GET'
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(response => response.json())
    },

    //добавление проекта
    Add(values) {
        let url = '/project'
        let method = 'PUT'
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
    },

    Change(values) {
        let url = '/project/' + values.Id
        let method = 'POST'
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
    },

    Delete(id) {
        let url = '/project/' + id
        let method = 'DELETE'
        return fetch(url, {
            method: method,
            heders: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        }).then(response => response.json())
    },

}