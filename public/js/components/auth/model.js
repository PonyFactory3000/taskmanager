let authModel = {
    Login(values) {
        let url = '/auth'
        let method = 'POST'
        return fetch(url,{
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(values)
        }).then(response => response.json())
    },

    Logout() {
        let url = '/logout'
        let method = 'GET'
        return fetch(url,{
            method: method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
        }).then(response => response.json())
    }
}