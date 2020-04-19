//основное окно
let mainWindow = {
    render() { webix.ui ({
        rows: [

            {
                view: 'toolbar',
                cols: [
                    {view: 'label', label: 'таск мэнеджер'},
                    // {view: 'button', id: 'auth', label: 'авторизация', width: 100,
                    //     click: function () { authWindow.show(); }
                    // },
                    {view: 'button', id: 'workersListButton', label: 'список сотрудников', width: 300,
                        click: function () {
                            employeeComponent.GetAll()
                            employeeListWindow.show()
                        }
                    },
                    {width: 300},
                    {view: 'button', id: 'exit', label: 'выход', width: 100,
                        click: function() {
                            authComponent.logout()
                        }
                    },
                ]
            },

            { cols: [
                
                projectsView,
                tasksView,

            ] },

        ]
    })
    }
}