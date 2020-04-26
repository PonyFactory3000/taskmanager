let taskModel = {

    GetTaskStatusList() {
        let url = '/taskStatus'
        let method = 'GET'
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        }).then(response => response.json())
    },

    GetAll(id) {
        let url = '/project/' + id + '/task'
        let method = 'GET'
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        }).then(response => response.json())
    },

    Add(values, id) {
        let url = '/project/' + id + '/task'
        let method = 'PUT'
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
    },

    ///project/:projectId/task/:id
    Change(values, projectId) {
        let url = '/project/' + projectId + '/task/' + values.Id
        let method = 'POST'
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
    },

    Delete(id, projectId) {
        let url = '/project/' + projectId + '/task/' + id
        let method = 'DELETE'
        return fetch(url, {
            method: method,
            heders: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        }).then(response => response.json())
    },

    SetStatus(values, projectId) {
        console.log("setStatus  ", values, "  ", projectId)
        let url = '/project/' + projectId + '/task/' + values.Id + '/status'
        let method = 'POST'
        return fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
    },
}