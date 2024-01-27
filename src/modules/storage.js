//this is to update the storage
import Todo from "./todo"
import Project from "./project"
import Task from "./task"

export default class Storage{
    static getToDo(){
        const todo = Object.assign(new Todo(),JSON.parse(localStorage.getItem('todo')));
        //set the projects and task
        //get all json projects -> map them into OOP projects

        todo.setProjects(
            //takes an arr
            todo.getProjects()
                .map((project)=>Object.assign(new Project,project))
        )
        todo.getProjects()
            .forEach((project)=>{
                project.setTasks(
                project.getTasks()
                .map((task)=>Object.assign(new Task,task))
                )
            })


        return todo;
        //apply todo from storage onto a new Todo object
    }

    static saveTodo(data){
        localStorage.setItem('todo',JSON.stringify(data));
    }

    static saveActive(projectName){
        localStorage.setItem('active',JSON.stringify(projectName))
    }
    static getActive(){
        return JSON.parse(localStorage.getItem('active')) || null
    }
    static resetActive(){
        localStorage.removeItem('active')
    }

}