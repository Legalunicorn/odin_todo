//this is for handlings projects 

//create a todo object which will be in localstorage
//other modules like project will manipulate this todo object

import Project from "./project"

export default class Todo {
    constructor(){
        this.projects =[]
        
    }
    
    addProject(name){
        //if found dont do it!
        if (this.projects.find((project)=>project.getName()==name)){
            alert('Project with this name already exists!')
            return //dont add it if it exists
        }
        this.projects.push(new Project(name));
    }
    deleteProject(name){
        console.log('todo-delteproject, name,',name)
        if (this.projects.find((project)=>project.getName()==name)){
            this.projects = this.projects.filter((project)=>project.getName()!=name)
        }
        return;
    }

    getProjects(){
        return this.projects;
    }

    getProject(projectName){
        return this.projects.find((project)=>project.getName()==projectName) || [];
    }

    setProjects(projects){
        this.projects =projects
    }
}