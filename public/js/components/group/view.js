//окнно просмотра проектной группы
let workGroupWindow = {
    show() {
        webix.ui({
            id: 'workGroupWindow',
            view: 'window', modal: true, move: true,
            position: 'center', width: 600, height: 500,
            head:{
                view:"toolbar", cols:[
                    {view:"label", label: "проектная группа" },
                    {view:"button", label: 'закрыть', width: 100, align: 'right',
                        click:function(){ $$('workGroupWindow').close(); }
                    }
                ]
            },
            body: {
                rows: [
                    {
                        view: 'toolbar',
                        cols: [
                            {view: 'button', id: 'groupWorkerAddButton', value: 'добавить',},
                            {view: 'button', id: 'groupWorkerRemoveButton', value: 'удалить'},
                        ]
                    },
                    {
                        view: 'datatable', id: 'workGroupTable',
                        autoconfig: true, select: 'row',
                        columns: [
                            {id: 'name', template: '#name#', adjust: true, fillspace: true},
                        ]
                    },
                ]
            }
        }).show()
    }
}