//окно списка работников
let employeeListWindow = {
    //показать окно
    show () {
        webix.ui({
            id: 'employeeListWindow',
            view: 'window', modal: true, move: true,
            position: 'center', width: 700, height: 600,
            head:{
                view:"toolbar", cols:[
                    {view:"label", label: "список работников" },
                    {view:"button", label: 'обновить', width: 100, align: 'right',
                        click:function(){ employeeComponent.GetAll() }
                    },
                    {view:"button", label: 'закрыть', width: 100, align: 'right',
                        click:function(){ $$('employeeListWindow').close(); }
                    }
                ]
            },
            body: {
                rows: [
                    
                    //кнопки управления
                    {
                        view: 'toolbar',
                        cols: [
                            {view: 'button', id: 'employeeAddButton', value: 'добавить',
                                click: function(){
                                    employeeChangeWindow.show('add');
                                }
                            },
                            {view: 'button', id: 'employeeChangeButton', value: 'изменить',
                                click: function() {
                                    employeeChangeWindow.show('change')
                                }
                            },
                            {view: 'button', id: 'employeeDeleteButton', value: 'удалить',
                                click: function() {
                                    employeeComponent.Delete()
                                }
                            },
                        ]
                    },
                
                    //таблица
                    {
                        view: 'datatable', id: 'employeeListTable',
                        autoconfig: true, select: 'row',
                        columns: [
                            {id: "Id", adjust: true, fillspace: true, hidden: true},
                            {id: "Name", adjust: true, fillspace: true},
                            {id: "Surname", adjust: true, fillspace: true},
                            // deleted {id: "Age", adjust: true, fillspace: true},
                            {id: "Post", adjust: true, fillspace: true},
                        ]
                    },
                ]
            }
        }).show()        
    }
}


//окно с формой изменения/добавления сотрудников в списке
let employeeChangeWindow = {
    show( stat ) {
        webix.ui ({
            id: 'employeeChangeWindow',
            view: 'window', modal: true, move: true,
            position: 'center', width: 500,// height: 400,
            head:{
                view:"toolbar", cols:[
                    {view:"label", label: "форма" },
                ]
            },
            body: {
                id: 'employeeChangeForm',
                view: 'form',
                elements: [
                    {view: 'text', label: 'id', name: 'Id', hidden: true},
                    {view: 'text', label: 'имя', name: 'Name'},
                    {view: 'text', label: 'фамилия', name: 'Surname'},
                    // deleted {view: 'text', label: 'age', name: 'Age'},
                    {view: 'text', label: 'должность', name: 'Post'},
                    // {view: 'text', label: 'логин', name: 'Login'},
                    // {view: 'text', label: 'пароль', name: 'Password'},
                    { margin:5, cols:[
                        { id: 'employeeAddFormButton', view:"button", value:"добавить", hidden: true,
                            click: function() {
                                employeeComponent.Add()
                            }
                        },
                        { id: 'employeeChangeFormButton', view:"button", value:"изменить", hidden: true,
                            click: function() {
                                employeeComponent.Change()
                            }
                        },
                        { view:"button", value:"отмена",
                            click: function() {
                                $$('employeeChangeWindow').close();
                            }
                        }
                    ]}
                ],
                rules: {
                    name: webix.rules.isNotEmpty,
                    surname: webix.rules.isNotEmpty,
                    post: webix.rules.isNotEmpty,
                },
            }
        })
        if (stat == 'add') { $$('employeeAddFormButton').show() }
        else if (stat == 'change') {
            $$('employeeChangeFormButton').show()
            values = $$('employeeListTable').getSelectedItem()
            $$('employeeChangeForm').setValues({
                Id: values.Id,
                Name: values.Name,
                Surname: values.Surname,
                // deleted Age: values.Age,
                Post: values.Post,
            })
        }
        $$('employeeChangeWindow').show()
    }
}