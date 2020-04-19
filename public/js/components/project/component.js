let projectComponent = {

    //получение списка проектов
    GetAll() {
        console.log("GetAllProjects")
        projectModel.GetAll().then(result => {
            console.log("result", result)

            if (result.Result != 0) {
                console.log(result.ErrorText)
                webix.message(result.ErrorText)
                window.location = "/login"
            }

            $$('projectsTable').clearAll()
            result.Data.forEach(element => {
                $$('projectsTable').add(element)
            })
        })
    },

    //добавление проекта
    Add() {
        console.log("AddProject")
        values = $$('projectChangeForm').getValues()
        console.log("values", values)
        projectModel.Add(values).then(result => {
            console.log("result", result)

            if (result.Result != 0) {
                console.log(result.ErrorText)
                webix.message(result.ErrorText)
                window.location = "/login"
            }

            $$('projectsTable').add(result.Data)
        })
        $$('projectChangeWindow').close()
    },

    //изменение проекта
    Change() {
        console.log("ChangeProject")
        values = $$('projectChangeForm').getValues()
        values.Id = parseInt(values.Id)
        console.log("values", values)
        projectModel.Change(values).then(result => {
            console.log("result", result)

            if (result.Result != 0) {
                console.log(result.ErrorText)
                webix.message(result.ErrorText)
                window.location = "/login"
            }

            $$("projectsTable").remove($$("projectsTable").getSelectedId())
            $$("projectsTable").add(result.Data)
            $$('ProjectDesArea').setValue("")
        })
        $$('projectChangeWindow').close()
    },

    //удаление проекта
    Delete() {
        console.log("DeleteProject")
        id = $$('projectsTable').getSelectedItem().Id
        $$("projectsTable").remove($$("projectsTable").getSelectedId())
        $$('ProjectDesArea').setValue("")
        $$('taskTable').clearAll()
        console.log(id)
        projectModel.Delete(id).then(result => {
            console.log("result", result)

            if (result.Result != 0) {
                console.log(result.ErrorText)
                webix.message(result.ErrorText)
                window.location = "/login"
            }
        })
    },

}