//this is for handlings projects 

//create a todo object which will be in localstorage
//other modules like project will manipulate this todo object

import Project from "./project"
export default class Todo {
    constructor(){
        this.projects =[]
        this.addProject('All');
    }
    
    addProject(name){
        //if found dont do it!
        if (this.projects.find((project)=>project.getName()==name)){
            return //dont add it if it exists
        }
        this.projects.push(new Project(name));
    }
    deleteProject(name){
        if (this.projects.find((project)=>project.getName()===name)){
            this.projects = this.projects.filter(project=>project.getName()==name)
        }
        return;
    }

    getProjects(){
        console.log("u",this.projects)
        return this.projects;
    }

    getProject(projectName){
        console.log('OIII',projectName)
        return this.projects.find((project)=>project.getName()==projectName) || console.log('failuretogetpro')
    }

    setProjects(projects){
        this.projects =projects
    }
}