let groupComponent = {

    //получение информации для заполнения окна
    GetAll(projectId) {
        console.log('showWorkGroupWindow')
        //получение списка сотрудников
        employeeModel.GetAll().then(listResult => {
            console.log('listResult', listResult)
            //получение группы сотрудников
            groupModel.GetAll(projectId).then(groupResult => {
                console.log('groupResult', groupResult)
                //распределение по таблицам
                listResult.Data.forEach(ListElement => {
                    //проверка присутствия в группе
                    res = false
                    groupResult.Data.forEach(groupElement => {
                        if (ListElement.Id == groupElement.Id) {res = true}
                    })
                    if (res == false) { $$('groupEmployeeList').add(ListElement) }
                    else { $$('workGroupTable').add(ListElement) }
                })
            })
        })
    },

    //добавить сотрудника в группу
    EmployeeAdd(projectId, employeeId) {
        console.log('EmployeeAdd')
        groupModel.Add(projectId, employeeId).then(result => {
            console.log('result', result)
            $$('workGroupTable').add($$('groupEmployeeList').getSelectedItem())
            $$('groupEmployeeList').remove($$('groupEmployeeList').getSelectedId())
        })
    },

    //убрать сотрудника из группы
    EmployeeRemove(projectId, employeeId) {
        console.log('employeeRemove')
        groupModel.Remove(projectId, employeeId).then(result => {
            console.log('result', result)
            $$('groupEmployeeList').add($$('workGroupTable').getSelectedItem())
            $$('workGroupTable').remove($$('workGroupTable').getSelectedId())
        })
    }
}