//this is to update the storage
import Todo from "./todo"

export default class Storage{

    static getToDo(){
        const todo = Object.assign(new Todo(),localStorage.getTodo());
        //apply todo from storage onto a new Todo object
    }

    static saveTodo(data){
        localStorage.setItem('todo',JSON.stringify(data));
    }

}