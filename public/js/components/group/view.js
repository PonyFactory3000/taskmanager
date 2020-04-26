//окнно просмотра проектной группы
let workGroupWindow = {
    show(projectId) {
        webix.ui({
            id: 'workGroupWindow',
            view: 'window', modal: true, move: true,
            position: 'center', width: 1200, height: 600,
            head:{
                view:"toolbar", cols:[
                    {view:"label", label: "редактирование проектных групп" },
                    {view:"button", label: 'закрыть', width: 100, align: 'right',
                        click:function(){ $$('workGroupWindow').close(); }
                    }
                ]
            },
            body: {
                cols: [

                    {rows: [
                        {
                            view: 'toolbar',
                            cols: [
                                {view: 'label', label: 'список сотрудников'},
                            ]
                        },
                        {
                            view: 'datatable', id: 'groupEmployeeList',
                            autoconfig: true, select: 'row',
                            columns: [
                                {id: 'Id', adjust: true, fillspace: true, hidden: true},
                                {id: 'Name', header:'имя', adjust: true, fillspace: true},
                                {id: 'Surname', header:'Фамилия', adjust: true, fillspace: true},
                            ]
                        },
                    ]},

                    {view: 'toolbar', height: 700,
                        rows: [
                            {height: 160},
                            {view: 'button', id: 'groupEmployeeAddButton', value: '=>', width: 100, height: 100,
                                click: function() { groupComponent.EmployeeAdd(
                                    $$('projectsTable').getSelectedItem().Id,
                                    $$('groupEmployeeList').getSelectedItem().Id
                                )}
                            },
                            {view: 'button', id: 'groupEmployeeRemoveButton', value: '<=', width: 100, height: 100,
                                click: function() { groupComponent.EmployeeRemove(
                                    $$('projectsTable').getSelectedItem().Id,
                                    $$('workGroupTable').getSelectedItem().Id
                                ) }
                            },
                        ]
                    },

                    {rows: [
                        {
                            view: 'toolbar', 
                            cols: [
                                {view: 'label', label: 'проектная группа'},
                            ]
                        },
                        {
                            view: 'datatable', id: 'workGroupTable',
                            autoconfig: true, select: 'row',
                            columns: [
                                {id: 'Id', adjust: true, fillspace: true, hidden: true},
                                {id: 'Name', header:'имя', adjust: true, fillspace: true},
                                {id: 'Surname', header:'Фамилия', adjust: true, fillspace: true},
                            ]
                        },
                    ]}

                ]
            }
        })
        groupComponent.GetAll(projectId)
        $$('workGroupWindow').show()
    }
}