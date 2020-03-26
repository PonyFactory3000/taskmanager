employeeModel = {

    GetAll() {
        let url = '/employee'
        let method = 'GET'
        return fetch(url,{
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(response => response.json())
    },

    Add(values) {
        let url = '/employee'
        let method = 'PUT'
        return fetch(url,{
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
    },

    Change() {
        let url = '/employee/' + values.Id
        let method = 'POST'
        return fetch(url,{
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
    },

    Delete(id) {
        let url = '/employee/' + id
        let method = 'DELETE'
        return fetch(url,{
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        }).then(response => response.json())
    }
}