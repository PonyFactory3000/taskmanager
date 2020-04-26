//таблица с кнопками на главном окне
let tasksView = { minWidth: 300, rows: [
    //кнопки
    {
        view: 'toolbar',
        rows: [
            { view: 'label', label: 'таски'},
            {cols: [
                {view: 'button', id: 'taskAdd', label: 'добавить',
                    click: function(){
                        taskComponent.ShowWindow('add')
                        // taskChangeWindow.show('add')
                    }
                },
                {view: 'button', id: 'taskChange', label: 'изменить',
                    click: function(){
                        taskComponent.ShowWindow('change')
                        // taskChangeWindow.show('change')
                    }
                },
                {view: 'button', id: 'taskDelete', label: 'удалить',
                    click: function() {
                        taskComponent.Delete()
                    }
                },
            ]},
        ]
    },

    //таблица
    {
        id: 'taskTable',
        view: 'datatable', autoconfig: true, select: 'row',
        columns: [
            {id: 'Id', adjust: true, fillspace: true, hidden: true},
            {id: 'Name', adjust: true, fillspace: 2},
            {id: 'Description', adjust: true, fillspace: true, hidden: true},
            {id: 'Status', adjust: true, fillspace: true},
            {id: 'EmployeeId', adjust: true, fillspace: true, hidden: true},
            {id: 'EmployeeName', adjust: true, fillspace: true, hidden: false},
            {id: 'EmployeeSurname', adjust: true, fillspace: true, hidden: false}
        ],
        on:{
            onItemClick: function() {
                $$('TaskDesArea').setValue($$('taskTable').getSelectedItem().Description)
                taskComponent.setStatusButtons()
            },
            onAfterUnSelect: function() {
                $$('statusButton1').hide()
                $$('statusButton2').hide()
            }
        },
    },
    { view: 'resizer'},
    { height: 100,
        id: 'TaskDesArea',
        view: 'textarea', readonly: true,
    },
    {
        //нижние кнопки настриваются в функции SetStatusButtons в taskComponent
        view: 'toolbar', height: 48,
        cols: [
            { id: 'statusButtonSpace', hidden: true,
                //отступ чтобы было красиво
            },
            {view: 'button', id: 'statusButton1', label: '', hidden: true,
                    click: function() {
                        alert(1)
                    }
            },
            {view: 'button', id: 'statusButton2', label: '', hidden: true,
                    click: function() {
                        alert(2)
                    }
            },
        ]
    },
] }

//окно изменения таски
let taskChangeWindow = {
    show( stat ) {
        webix.ui ({
            id: 'taskChangeWindow',
            view: 'window', modal: true, move: true,
            position: 'center', width: 500,// height: 300,
            head:{
                view:"toolbar", cols:[
                    {view:"label", label: "таск" },
                ]
            },
            body: {
                id: 'taskChangeForm',
                view: 'form',
                elements: [
                    {view: 'text', label: 'Id', name: 'Id', hidden: true},
                    {view: 'text', label: 'Name', name: 'Name'},
                    {view: 'textarea', label: 'Description', name: 'Description', height: 100},
                    // {view: 'select', label: 'Status', name: 'Status', value: 1,
                    //     options: taskComponent.statusList
                    // },
                    { margin:5, cols:[
                        { id: 'taskAddFormButton', view:"button", value:"добавить", hidden: true,
                            click: taskComponent.Add
                        },
                        { id: 'taskChangeFormButton', view:"button", value:"изменить", hidden: true,
                            click: taskComponent.Change
                        },
                        { view:"button", value:"Cancel",
                            click: function() {
                                $$('taskChangeWindow').close();
                            }
                        }
                    ]}
                ]
            }
        })
        if (stat == 'add') { $$('taskAddFormButton').show() }
        else if (stat == 'change') {
            $$('taskChangeFormButton').show()
            values = $$('taskTable').getSelectedItem()
            $$('taskChangeForm').setValues({
                Id: values.Id,
                Name: values.Name,
                Description: values.Description,
            })
        }
        $$('taskChangeWindow').show();
    }
}

let setEmployeeWindow = {
    show() {
        webix.ui ({
            id: 'setEmployeeWindow',
            view: 'window', modal: true, move: true,
            position: 'center', width: 700,// height: 300,
            head:{
                view:"toolbar", cols:[
                    {view:"label", label: "назначить задачу" },
                    {view:"button", label: 'закрыть', width: 100, align: 'right',
                        click:function(){ $$('setEmployeeWindow').close(); }
                    }
                ]
            },
            body: { rows: [    
                {
                    view: 'datatable', id: 'setEmployeeTable',
                    autoconfig: true, select: 'row',
                    columns: [
                        {id: 'Id', adjust: true, fillspace: true, hidden: true},
                        {id: 'Name', header:'имя', adjust: true, fillspace: true},
                        {id: 'Surname', header:'Фамилия', adjust: true, fillspace: true},
                    ],
                    on:{
                        onItemClick: function() {
                            $$('setEmployeeButton').show()
                        }
                    },
                },
                { id: 'setEmployeeButton', view:"button", value:"назначить", hidden: true,
                    click: function() {
                        console.log($$('setEmployeeTable').getSelectedItem().Id)
                        taskComponent.SetStatus("Назначена", $$('setEmployeeTable').getSelectedItem().Id)
                        $$('setEmployeeWindow').close()
                    }
                }
                // $$('setEmployeeTable').getSelectedItem().Id
            ] }
        })
        projectId = $$('projectsTable').getSelectedItem().Id
        groupModel.GetAll(projectId).then(result => {
            console.log('groupResult', result)
            if (result.Result != 0) {
                console.log(result.ErrorText)
                webix.message(result.ErrorText)
                window.location = "/login"
            }

            result.Data.forEach(element => {
                $$('setEmployeeTable').add(element)
            })
        })
        $$('setEmployeeWindow').show()
    }
}