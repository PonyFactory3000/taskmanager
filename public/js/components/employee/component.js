employeeComponent = {

    //открыть список работников
    GetAll() {
        console.log('employeeGetAll')
        employeeModel.GetAll().then(result => {
            console.log('result', result)

            if (result.Result != 0) {
                console.log(result.ErrorText)
                webix.message(result.ErrorText)
                window.location = "/login"
            }

            $$('employeeListTable').clearAll()
            result.Data.forEach(element => {
                $$('employeeListTable').add(element)
            })
        })
    },

    //добавление сотрудника
    Add() {
        console.log('employeeAdd')
        values = $$('employeeChangeForm').getValues()
        values.Age = parseInt(values.Age)
        console.log('values', values)
        employeeModel.Add(values).then(result => {
            console.log(result)

            if (result.Result != 0) {
                webix.message(result.ErrorText)
                window.location = "/login"
            }

            $$('employeeListTable').add(result.Data)
        })
        $$('employeeChangeWindow').close()
    },

    //изменение сотрудника
    Change() {
        console.log('employeeChange')
        values = $$('employeeChangeForm').getValues()
        values.Id = parseInt(values.Id)
        // deleted values.Age = parseInt(values.Age)
        console.log('values ',values)
        employeeModel.Change(values).then(result => {
            console.log(result)

            if (result.Result != 0) {
                webix.message(result.ErrorText)
                window.location = "/login"
            }

            $$('employeeListTable').remove($$('employeeListTable').getSelectedId())
            $$('employeeListTable').add(result.Data)
        })
        $$('employeeChangeWindow').close()
    },

    //удаление сотрудника
    Delete() {
        console.log('employeeDelete')
        id = $$('employeeListTable').getSelectedItem().Id
        employeeModel.Delete(id).then(result => {
            console.log(result)

            if (result.Result != 0) {
                webix.message(result.ErrorText)
                window.location = "/login"
            }
            
        })
        $$("employeeListTable").remove($$("employeeListTable").getSelectedId())
    }
}