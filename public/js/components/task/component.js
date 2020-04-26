let taskComponent = {

    statusList: [
        {id: 1, value: "test"},
        {id: 2, value: "text"},
    ],

    //$$('taskAdd').define({
    //     click: function() {
    //         alert("42")
    //     }
    // })

    //
    ShowWindow(stat) {
        // console.log("GetAllTasks")
        // taskModel.GetTaskStatusList().then(result => {
        //     console.log("result", result)

        //     if (result.Result != 0) {
        //         console.log(result.ErrorText)
        //         webix.message(result.ErrorText)
        //         window.location = "/login"
        //     }

        //     this.statusList.splice(0, this.statusList.length)
        //     result.Data.forEach(element => {
        //         this.statusList.push({
        //             id: element.Id,
        //             value: element.Name
        //         })
        //     })
        //     console.log(this.statusList)
            if (stat == 'add') { taskChangeWindow.show(stat) }
            else if (stat == 'change') { taskChangeWindow.show(stat) }
        //})
    },

    //получение всех задач
    GetAll() {
        console.log("GetAllTasks")
        id = $$('projectsTable').getSelectedItem().Id
        taskModel.GetAll(id).then(result => {
            console.log("result", result)

            if (result.Result != 0) {
                console.log(result.ErrorText)
                webix.message(result.ErrorText)
                window.location = "/login"
            }

            $$('taskTable').clearAll()
            $$('TaskDesArea').setValue("")
            result.Data.forEach(element => {
                values = {
                    Id: element.Id,
                    Name: element.Name,
                    Description: element.Description,
                    Status: element.Status,
                    EmployeeId: element.EmployeeId.Int64,
                    EmployeeName: element.EmployeeName.String,
                    EmployeeSurname: element.EmployeeSurname.String
                }
                $$('taskTable').add(values)
            })
        })        
    },

    //добавление задачи
    Add() {
        console.log("AddTask")
        values = $$('taskChangeForm').getValues()
        console.log("values", values)
        id = $$('projectsTable').getSelectedItem().Id
        taskModel.Add(values, id).then(result => {
            console.log("result", result)

            if (result.Result != 0) {
                console.log(result.ErrorText)
                webix.message(result.ErrorText)
                window.location = "/login"
            }

            values = {
                Id: result.Data.Id,
                Name: result.Data.Name,
                Description: result.Data.Description,
                Status: result.Data.Status,
                EmployeeId: result.Data.EmployeeId.Int64,
                EmployeeName: result.Data.EmployeeName.String,
                EmployeeSurname: result.Data.EmployeeSurname.String
            }
            $$('taskTable').add(values)
        })
        $$('taskChangeWindow').close()
    },

    //изменение задачи
    Change() {
        console.log("ChangeTask")
        ProjectId = $$('projectsTable').getSelectedItem().Id
        values = $$('taskChangeForm').getValues()
        values.Id = parseInt(values.Id)
        console.log("values", values)
        taskModel.Change(values).then(result => {
            console.log("result", result)
            if (result.Result != 0) {
                console.log(result.ErrorText)
                webix.message(result.ErrorText)
                window.location = "/login"
            }
            $$("taskTable").remove($$("taskTable").getSelectedId())
            // $$("taskTable").add(result.Data)
            taskComponent.GetAll()
            $$('TaskDesArea').setValue("")
        })
        $$('taskChangeWindow').close()
    },
    
    //удаление задачи
    Delete() {
        console.log("DeleteTask")
        ProjectId = $$('projectsTable').getSelectedItem().Id
        id = $$('taskTable').getSelectedItem().Id
        $$("taskTable").remove($$("taskTable").getSelectedId())
        $$('TaskDesArea').setValue("")
        console.log(id, ProjectId)
        taskModel.Delete(id, ProjectId).then(result => {
            console.log("result", result)
            if (result.Result != 0) {
                console.log(result.ErrorText)
                webix.message(result.ErrorText)
                window.location = "/login"
            }
            
        })
    },

    SetStatus(status, employee) {
        console.log("SetStatus ", employee )
        ProjectId = $$('projectsTable').getSelectedItem().Id
        if (employee == "") {
            console.log('aaaf ', $$('taskTable').getSelectedItem().EmployeeId)
            employee = $$('taskTable').getSelectedItem().EmployeeId
        }
        id = parseInt($$('taskTable').getSelectedItem().Id)
        values = {
            Id: id,
            Status: status,
        }
        if (parseInt(employee) > 0) {
            values.EmployeeId = {Int64: parseInt(employee), Valid: true}
        }
    
        console.log("values ", values)
        taskModel.SetStatus(values, ProjectId).then(result => {
            console.log("result", result)
            if (result.Result != 0) {
                console.log(result.ErrorText)
                webix.message(result.ErrorText)
                window.location = "/login"
            }

            $$("taskTable").remove($$("taskTable").getSelectedId())
            // $$("taskTable").add(result.Data)
            taskComponent.GetAll()
            $$('TaskDesArea').setValue("")
        })
    },

    // SetEmployee() {
    //     taskModel.SetStatus('Назначена', $$('setEmployeeTable').getSelectedItem().Id)
    // },

    //настривает кнопки в зависимости от текущего статуса
    setStatusButtons() {
        $$('statusButtonSpace').hide()
        status = $$('taskTable').getSelectedItem().Status
        switch(status) {
            
            case 'Новая': {
                $$('statusButton1').define({
                    label: 'назначить',
                    click: function() {
                        setEmployeeWindow.show()
                    }
                })
                $$('statusButton1').show()
                $$('statusButton2').define({
                    label: 'Отложить',
                    click: function() {
                        taskComponent.SetStatus('Отложена', "")
                    }
                })
                $$('statusButton2').show()
                break
            }

            case 'Назначена': {
                $$('statusButton1').define({
                    label: 'Завершить',
                    click: function() {
                        taskComponent.SetStatus('Завершена', "")
                    }
                })
                $$('statusButton1').show()
                $$('statusButton2').define({
                    label: 'Отложить',
                    click: function() {
                        taskComponent.SetStatus('Отложена', "")
                    }
                })
                $$('statusButton2').show()
                break
            }

            case 'Отложена': {
                $$('statusButton1').define({
                    label: 'назначить',
                    click: function() {
                        setEmployeeWindow.show()
                    }
                })
                $$('statusButton1').show()
                $$('statusButton2').define({
                    label: 'Отменить',
                    click: function() {
                        taskComponent.SetStatus('Отменена', "")
                    }
                })
                $$('statusButton2').show()
                break
            }

            case 'Отменена': {
                $$('statusButton1').define({
                    label: 'Отложить',
                    click: function() {
                        taskComponent.SetStatus('Отложена', "")
                    }
                })
                $$('statusButton1').show()
                $$('statusButton2').define({
                    label: 'Удалить',
                    click: function() {
                        taskComponent.Delete()
                    }
                })
                $$('statusButton2').show()
                break
            }

            // case 'Завершена': {
            //     $$('statusButton1').hide()
            //     $$('statusButtonSpace').show()
            //     $$('statusButton2').define({
            //         label: 'Отложить',
            //         click: function() {
            //             taskComponent.SetStatus('Отложена', "")
            //         }
            //     })
            //     $$('statusButton2').show()
            //     break
            // }
        }
    }
}