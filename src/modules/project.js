//this is for handing within projects
//ie task managements
import Task from "./task"

export default class Project{
    constructor(projectName){
        this.projectName = projectName
        this.tasks = []
        this.count = 0
    }
    getName(){
        return this.projectName;
    }
    setName(name){
        this.projectName = name;
    }
    addCount(){
        this.count++;
    }
    resetCount(){
        this.count=0;
    }

    addTask(title,desc,date){
        const newTask = new Task(title,desc,date,this.projectName);
        newTask.setID(this.count);
        this.addCount();
        //consider addin task ID to a html-data element
        this.tasks.push(newTask);
    }

    deleteTask(taskID){
        //id will be uniqute
        //use task module
        if (this.tasks.find((task)=>task.id==taskID)){
            this.tasks = this.tasks.filter(task=>task.id!=taskID)
        }
    }

    getTasks(){
        return this.tasks;
    }
    getTask(taskID){
        return this.tasks.find((task)=>task.getID()==taskID)
    }

    setTasks(tasks){
        this.tasks=tasks
    }
}