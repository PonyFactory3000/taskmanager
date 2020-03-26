//окно авторизации
let authWindow = {
    show() {
        webix.ui ({
            id: 'authWindow',
            view: 'window', modal: true, move: true,
            position: 'center', width: 500,// height: 600,
            head:{
                view:"toolbar", cols:[
                    {view:"label", label: "авторизация" },
                    {view:"button", label: 'отмена', width: 100, align: 'right', click:function(){ $$('authWindow').close(); }}
                ]
            },
            body: {
                id: 'authForm',
                view: 'form',
                elements: [
                    {view: 'text', label: 'логин', name: 'login'},
                    {view: 'text', label: 'пароль', type: 'password', name: 'password'},
                    { margin: 5, cols: [
                        { id: 'loginFormButton', view: 'button', value: 'войти'},
                    ]},
                ]
            }
        }).show()
    }
}