//таблица с кнопками на главном окне
let projectsView = { width: 400, rows: [
    {
        //кнопки
        view: 'toolbar',
        rows: [
            {cols: [
                { view: 'label', label: 'проекты'},
            {view: 'button', id: 'projectUpdate', label: 'обновить',
                click: function() { projectComponent.GetAll() }
            },
            ]},
            {cols: [
                {view: 'button', id: 'projectAdd', label: 'добавить',
                    click: function(){
                        projectChangeWindow.show('add');
                    },
                },
                {view: 'button', id: 'projectChange', label: 'изменить',
                    click: function(){
                        projectChangeWindow.show('change')
                    },
                },
                {view: 'button', id: 'projectDelete', label: 'удалить',
                    click: function(){
                        projectComponent.Delete()
                    }
                },
            ]},
        ]
    },

    //таблица
    {
        id: 'projectsTable',
        view: 'datatable',  select: 'row',
        columns: [
            {id: 'Id', template: '#Id#', header:'Id', adjust: true, hidden: true},
            {id: 'Name', template: '#Name#', header:'имя', adjust: true, fillspace:1},
            {id: 'Description', template: '#Description#', header:'Описание', adjust: true, fillspace:2, hidden: true},
        ],
        on:{
            onItemClick: function() { 
                $$('ProjectDesArea').setValue($$('projectsTable').getSelectedItem().Description)
                taskComponent.GetAll()
            }
        },
    },
    { view: 'resizer'},
    { height: 100,
        id: 'ProjectDesArea',
        view: 'textarea', readonly: true,
    },
    {
        //нижние кнопки
        view: 'toolbar',
        cols: [
            {view: 'button', label: 'проектная группа', height: 40,
                click: function(){ workGroupWindow.show($$('projectsTable').getSelectedItem().Id); }
            },
        ]
    },
] }


//окно создания/изменения проекта
let projectChangeWindow = {
    //показать окно
    //stat - "add"/"change" - показать нужную кнопку для добавления/изменения в зависимости от контекста
    show (stat) {
        webix.ui ({
            id: 'projectChangeWindow',
            view: 'window', modal: true, move: true,
            position: 'center', width: 500,// height: 600,
            head:{
                view:"toolbar", cols:[
                    {view:"label", label: "проект" },
                ]
            },

            //форма
            body: {
                id: 'projectChangeForm',
                view: 'form',
                elements: [
                    {view: 'text', label: 'Id', name: 'Id', hidden: true},
                    {view: 'text', label: 'Название', name: 'Name'},
                    {view: 'textarea', label: 'Описание', name: 'Description', height: 100},
                    { margin:5, cols:[
                        { id: 'projectAddFormButton', view:"button", value:"добавить", hidden: true,
                            click: projectComponent.Add
                        },
                        { id: 'projectChangeFormButton', view:"button", value:"изменить", hidden: true,
                            click: projectComponent.Change
                        },
                        { view:"button", value:"отмена",
                            click: function() {
                                $$('projectChangeWindow').close();
                            }
                        }
                    ]}
                ]
            }
        })

        //показ нужной кнопки (добавить/изменить), в зависимости от аргумента
        if (stat == 'add') { $$('projectAddFormButton').show() }
        else if (stat == 'change') {
            $$('projectChangeFormButton').show()
            values = $$('projectsTable').getSelectedItem()
            $$('projectChangeForm').setValues({
                Id: values.Id,
                Name: values.Name,
                Description: values.Description,
            })
        }
        $$('projectChangeWindow').show();
    }
}

