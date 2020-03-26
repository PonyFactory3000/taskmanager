//основное окно
let mainWindow = {
    render() { webix.ui ({
        rows: [

            {
                view: 'toolbar',
                cols: [
                    {view: 'label', label: 'таск мэнеджер'},
                    {view: 'button', id: 'auth', label: 'авторизация', width: 100,
                        click: function () { authWindow.show(); }
                    },
                    {view: 'button', id: 'workersListButton', label: 'список сотрудников', width: 100,
                        click: function () {
                            employeeComponent.GetAll()
                            employeeListWindow.show()
                        }
                    },
                    {view: 'button', id: 'exit', label: 'выход', width: 100,
                
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