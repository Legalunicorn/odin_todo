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
        client.loadActiveProject();
        client.initModalButtons();
        // client.initProjectNav(); //moved to load projects
        // client.initDeleteProject();
    }
    static loadProjects(){ //load into screen
        Storage.getToDo()
            .getProjects()
            .forEach((project)=>{
                client.createProject(project) //this is a oop instance idk if it will work lol
            })

        //there IS an active project + make sure incase there are projects existing
        if (Storage.getActive()!=null && Storage.getToDo().getProjects().length!=0){
            //you are trying to set active to a deleted 
            console.log('THE ACTIVE PROJ IS: ',Storage.getActive())
            client.setActive(Storage.getActive())
        }
        client.initProjectNav();
        client.initDeleteProject();

        
    }
    static setActive(projectName){
        const project = document.querySelector(`[data-project-name="${projectName}"]`);
        console.log('error,',project,projectName)
        project.classList.add('active')
    }

    static createProject(project){
        //not the same as addproject, this is a loadProject helper function
        const projList = document.querySelector('ul.projects')
        projList.innerHTML+=
        `
        <li data-project-name="${project.getName()}" class="project">
        <span>${project.getName()}</span>
        <span data-del-project="${project.getName()}" class="material-symbols-rounded">close</span>
        </li>
        `   
    }
    static loadTasks(projectName){
        //load from db
        // console.log('ALL. ',Storage.getToDo())
        // console.log('loading task...',Storage.getToDo('hello world').getTasks())
        Storage.getToDo()
            .getProject(projectName) //add logic to check for tasks maybe
            .getTasks()
            .forEach((task)=>{ 
                client.createTask(task)
            })
            console.log('CLEAR!')
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
        <div  class="material-symbols-rounded">close</div>
        </li>
        `
    }
    static loadActiveProject(){
        //projects are loaded, get the name of which is active
        const activeProject = document.querySelector('.project.active > span');
        if (activeProject==null) return
        const activeProjectName =activeProject.textContent;
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
        const activeProjectSpan = document.querySelector('.project.active>span');
        if (activeProjectSpan==null)return;
        return activeProjectSpan.textContent;
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
                console.log(client.getActiveProjectName()==null)
                if (button.dataset.modalTarget=="#add-task-modal" && client.getActiveProjectName()==null){
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
        submitTaskButton.addEventListener('click',()=>{
            client.closeModal(submitTaskButton.closest(".modal"))
            //NEW TASK INFORMATION
            const newTaskTitle = document.getElementById('add-task-title').value
            const newTaskDesc = document.getElementById('add-task-desc').value
            const newTaskDate = document.getElementById('add-task-date').value;
            if (newTaskTitle ==''){
                alert('Task title cannot be empty!');
                return
            } 
            const activeProjectName = client.getActiveProjectName();
            let todo = Storage.getToDo(); //current unupdated data
            todo.getProject(activeProjectName) //returns project obj
                .addTask(newTaskTitle,newTaskDesc,newTaskDate)
            Storage.saveTodo(todo); //save to locaolstorage

            //refresh data into view
            client.clearTasks();
            client.loadTasks(activeProjectName); //REMOVES ACTIV TASK
        })
        //submit new project
        const submitProjectButton = document.querySelector('[data-submit="add-project"]');
        submitProjectButton.addEventListener('click',()=>{
            const newProjectName = document.getElementById('add-project').value
            if (newProjectName==''){
                alert('Project Name cannot be null')
                return
            }
            else if (Storage.getToDo().getProject(newProjectName)==newProjectName){
                alert('Project name alreadt in use!')
                return
            }
            client.closeModal(submitProjectButton.closest(".modal"))
            
            const todo = Storage.getToDo()
            todo.addProject(newProjectName);
            Storage.saveTodo(todo);

            client.clearProjects();
            client.loadProjects();
            if (todo.getProjects().length==1){
                const toBeActive = document.querySelector('li.project');
                toBeActive.classList.add('active')
                Storage.saveActive(toBeActive.dataset.projectName)
            }
            // client.initProjectNav();
        })
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

    //nav bar toggle functionality
    static initProjectNav(){
        const projects = document.querySelectorAll('li.project span:first-child');
        console.log('this is all the projects',projects)
        projects.forEach((project)=>{
            project.addEventListener('click',()=>{
                const projectNode = project.parentNode
                console.log(projectNode.classList)
                //is already active project 
                if (projectNode.classList.contains('active')){
                    return;
                }

                //not active project, change it to be the active project
                const activeProject = document.querySelector('.project.active');
                activeProject.classList.remove('active');
                projectNode.classList.add('active');
                //change task view
                console.log('PROJ NAME IS: ',projectNode.dataset.projectName)


                client.clearTasks();
                client.loadTasks(projectNode.dataset.projectName);

            })
        })
    }
    static setFirstToActive(){
        if (Storage.getToDo().getProjects().length>=1){
            const firstProjectName = Storage.getToDo().getProjects()[0].getName();
            Storage.saveActive(firstProjectName)
        }
    }
    static initDeleteProject(){
        const delProjectButtons = document.querySelectorAll('[data-del-project]')
        delProjectButtons.forEach((button)=>{
            button.addEventListener('click',()=>{
                let isActive;
                if (button.parentNode.classList.contains('active')){
                    isActive = true;
                    //later set storage.setActive() => todo.getproj[0].getname()
                }
                const todo = Storage.getToDo();
                todo.deleteProject(button.dataset.delProject);
                Storage.saveTodo(todo); 
                
                //you deleted the activeproj + there exists other projects OR
                //after you deleted, there exists only one proj
                if ((isActive && todo.getProjects().length>0) || (todo.getProjects().length==1)){
                    console.log('bef sfta: ',Storage.getActive())
                    client.setFirstToActive();
                    console.log('aft sfta: ',Storage.getActive())

                }
                if (todo.getProjects().length==0){
                    Storage.resetActive();
                }
                console.log('DELETED: ',button.dataset.delProject)
                client.clearProjects();
                client.loadProjects();
                console.log('loaded.')
                client.initProjectNav();
                client.initDeleteProject();

            })
        })
    }


}