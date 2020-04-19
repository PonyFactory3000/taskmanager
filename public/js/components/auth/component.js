let authComponent = {
    login(values) {
        // values = $$('authform').GetValues()
        console.log("login  ",values)
        authModel.Login(values).then(result => {
            console.log(result)
            if (result.Result != 0) { webix.message(result.ErrorText) }
            else { window.location = "/" }
        })
    },

    logout() {
        // values = $$('authform').GetValues()
        console.log("logout")
        authModel.Logout().then(result => {
            console.log(result)
            window.location = "/login"
        })
    }
}
