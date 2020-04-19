let taskComponent = {

    statusList: [
        {id: 1, value: "test"},
        {id: 2, value: "text"},
    ],

    //
    ShowWindow(stat) {
        console.log("GetAllTasks")
        taskModel.GetTaskStatusList().then(result => {
            console.log("result", result)

            if (result.Result != 0) {
                console.log(result.ErrorText)
                webix.message(result.ErrorText)
                window.location = "/login"
            }

            this.statusList.splice(0, this.statusList.length)
            result.Data.forEach(element => {
                this.statusList.push({
                    id: element.Id,
                    value: element.Name
                })
            })
            console.log(this.statusList)
            if (stat == 'add') { taskChangeWindow.show(stat) }
            else if (stat == 'change') { taskChangeWindow.show(stat) }
        })
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
                $$('taskTable').add(element)
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

            $$('taskTable').add(result.Data)
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
            $$("taskTable").add(result.Data)
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

}