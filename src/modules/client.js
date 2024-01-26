//this is for the buttons to do stuff when pressed
//load all the stuff too
// interactivity and DOM changes goes here
//import from storage to load stuff
import Storage from './storage'
// import Todo from './todo'
// import Project from './project'
// import Task from './task'

export default class client{
    //part1 - load/reload page contents
    //set All to active
    static loadPage(){
        client.clearProjects();
        client.clearTasks();
        client.loadProjects();
        client.setActive();
        client.loadActiveProject();
        client.initModalButtons();
        client.initProjectNav();
    }
    static loadProjects(){ //load into screen
        console.log('hi',Storage.getToDo())
        Storage.getToDo()
            .getProjects()
            .forEach((project)=>{
                client.createProject(project) //this is a oop instance idk if it will work lol
            })
    }
    static setActive(){
        const All = document.querySelector('[data-project-name="All"]');
        All.classList.add('active');
    }
    static createProject(project){
        //not the same as addproject, this is a loadProject helper function
        console.log('createProj',project,project.projectName,project)
        console.log('ererr',project.getName())
        const projList = document.querySelector('ul.projects')
        projList.innerHTML+=
        `
        <li data-project-name=${project.getName()} class="project">
        <span>${project.getName()}</span>
        <span class="material-symbols-rounded">close</span>
        </li>
        `   
    }
    static loadTasks(projectName){
        //load from db
        Storage.getToDo()
            .getProject(projectName) //add logic to check for tasks maybe
            .getTasks()
            .forEach((task)=>{ 
                client.createTask(task)
            })
    }
    static createTask(task){
        const taskList = document.querySelector('ul.tasks');
        console.log('ta?',task)
        console.log('ta2',task.title)
        console.log('ta3',task.getTitle())
        taskList.innerHTML+=
        `
        <li class="task">
        <div class="mycheckbox"></div>
        <span class="task_title">${task.getTitle()}</span>
        <span class="task_dateline">${task.getDate()}</span>
        <div class="material-symbols-rounded favourite ${task.isStarred()}">star</div>
        <div class="material-symbols-rounded">close</div>
        </li>
        `
    }
    static loadActiveProject(){
        //projects are loaded, get the name of which is active
        const activeProjectName = document.querySelector('.project.active > span').textContent;
        console.log('the apn is ',activeProjectName)
        if (activeProjectName != null){
            client.loadTasks(activeProjectName)
        }
    }

    static clearProjects(){
        const projectList = document.querySelector('ul.projects');
        projectList.innerHTML='';
    }

    static clearTasks(){
        const taskList = document.querySelector('ul.tasks');
        taskList.innerHTML='';
    }
    //
    static getActiveProjectName(){
        return document.querySelector('.project.active>span').textContent;
    }
    static initModalButtons(){
        const overlay = document.getElementById('overlay');
        client.initOpenModalButtons()
        client.initCloseModalButtons()
        client.initSubmitButtons()
    }
    static initOpenModalButtons(){
        //for addTask make sure theres an active Project
        const openModalButtons = document.querySelectorAll('[data-modal-target]')
        openModalButtons.forEach(button=>{
            button.addEventListener('click',(e)=>{
                console.log('YES U CLICKED')
                //check if for at least one proejct if they were to add task
                if (e.target.dataset.modalTarget && client.getActiveProjectName()==null){
                    alert('You must have at least one Project to add Task');
                    return
                }
                console.log(client.getActiveProjectName())
                const modal = document.querySelector(button.dataset.modalTarget)
                console.log(modal,button)
                client.openModal(modal)
            })
        })

    }
    static initSubmitButtons(){
        //submit new task
        //1. addevent -> call submit task?
        const submitTaskButton = document.querySelector('[data-submit="add-task"]');
        console.log(submitTaskButton)
        submitTaskButton.addEventListener('click',()=>{
            //close modal
            client.closeModal(submitTaskButton.closest(".modal"))
            //NEW TASK INFORMATION
            console.log('o', document.getElementById('add-task-title'))
            const newTaskTitle = document.getElementById('add-task-title').value
            if (newTaskTitle ==''){
                alert('Task title cannot be empty!');
                return
            } 
            const newTaskDesc = document.getElementById('add-task-desc').value
            const newTaskDate = document.getElementById('add-task-date').value;
            console.log('The value of data: ',newTaskDate);
            //submit form to DB
            //NEW TASK CANNOT BE OPENED IF THERE IS NO PROEJCT , ALREADY HANDLED
            const activeProjectName = client.getActiveProjectName();
            const todo = Storage.getToDo(); //current unupdated data
            //upda
            todo.getProject(activeProjectName) //returns project obj
                .addTask(newTaskTitle,newTaskDesc,newTaskDate)
            Storage.saveTodo(todo); //save to locaolstorage

            //refresh data into view
            client.clearTasks();
            client.loadTasks(activeProjectName);
        })
        //submit new project
        const submitProjectButton = document.querySelector('[data-submit="add-project"]')
    }
    static initCloseModalButtons(){
        //close add task, add pro
        const closeModalButtons = document.querySelectorAll('[data-close-modal]')
        closeModalButtons.forEach((button)=>{
            button.addEventListener('click',()=>{
                const modal = button.closest('.modal')
                client.closeModal(modal);
            })
        })
    }
    static openModal(modal){
        if (modal==null) return
        modal.classList.add('active');
        //overlay defined in client.initModalButtons
        overlay.classList.add('active');
    };
    static closeModal(modal){
        if (modal==null) return
        modal.classList.remove('active');
        overlay.classList.remove('active');
        
    }

    //nav bar functionality
    static initProjectNav(){
        //this is purely dom manipulation
        const projects = document.querySelectorAll('li.project');
        projects.forEach((project)=>{
            project.addEventListener('click',()=>{
                //is already active project 
                if (project.classList.contains('active')){
                    return;
                }
                //not active project, change it to be the active project
                const activeProject = document.querySelector('.project.active');
                activeProject.classList.remove('active');
                project.classList.add('active');
                const projectName = project.querySelector('span').textContent();
                //change task view
                client.clearTasks();
                client.loadTasks(projectName);

            })
        })
    }

}