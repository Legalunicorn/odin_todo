//this is for handlings projects 

export default class Todo {
    constructor(){
        this.projects =[]
    }

    addProject(name){
        //if found dont do it!
        this.projects.push(name)
    }
    deleteProject(name){
        if (this.projects.find((project)=>project.getName()===name)){
            return
        }
        
        //make sure if font
    }
}