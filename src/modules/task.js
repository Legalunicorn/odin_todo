//this is for handing within the task
// ie edit tasks etc

export default class Task{
    constructor(title,desc,date,parentName){
        this.title = title;
        this.desc = desc;
        this.date = date;
        this.isStar = false;
        this.isCheck = false;
        this.parentName = parentName
        this.id = 0
    }
    getParent(){
        return this.parentName
    }

    //setters and getters
    getTitle(){
        return this.title;
    }

    setTitle(title){
        this.title = title;
    }

    getDesc(){
        return this.desc;
    }
    setDesc(desc){
        this.desc = desc;
    }
    //probably need some date functions
    getDate(){
        return this.date;
    }
    setDate(date){
        this.date = date;
    }

    setID(id){
        this.id=id;
    }
    getID(){
        return this.id;
    }
    toggleStar(){
        //change css in client
        if (this.isStar){
            this.isStar = false;
        }
        else{
            this.isStar = true;
        }
    }

    isStarred(){
        if (this.isStar){
            return 'priority'
        }
        else{
            return ''
        }
    }

    toggleCheck(){
        if (this.isCheck){
            this.isCheck=false;
        }
        else{
            this.isCheck=true;
        }
    }
    isChecked(){
        if (this.isCheck){
            return 'checked'
        }
        else{
            return ''
        }
    }

    



    
}