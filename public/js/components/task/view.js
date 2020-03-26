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
            {id: 'Id', adjust: true, fillspace: true},
            {id: 'Name', adjust: true, fillspace: true},
            {id: 'Description', adjust: true, fillspace: true},
        ]
    },
    { view: 'resizer'},
    { height: 139,
        view: 'textarea', readonly: true,
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
                    {view: 'text', label: 'Id', name: 'Id'},
                    {view: 'text', label: 'Name', name: 'Name'},
                    {view: 'textarea', label: 'Description', name: 'Description', height: 100},
                    {view: 'select', label: 'Status', name: 'Status', value: 1,
                        options: taskComponent.statusList
                    },
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