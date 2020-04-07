let groupModel = {
    //получение списка Id сотрудников группы
    GetAll(projectId) {
        let url = '/group/' + projectId
        let method = 'GET'
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(response => response.json())
    },

    Add(projectId, employeeId) {
        let url = '/group/' + projectId + '/' + employeeId
        let method = 'PUT'
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(response => response.json())
    },

    Remove(projectId, employeeId) {
        let url = '/group/' + projectId + '/' + employeeId
        let method = 'DELETE'
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(response => response.json())
    }

}