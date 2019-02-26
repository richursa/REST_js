var database = {};
function addUser(key, usersDetails){
    database[key] = usersDetails;
}

var usersDetails = [{
    "name"      : "tittu",
    "toDoList" : ["dance","run"],
    "apiCalls"    : {
        "getlist"       :0,
        "addTask"       :0,
        "taskCompleted" :0,
        "totalApiCalls" :0
    }
    },
{
    "name"        : "richu",
    "toDoList"    : [],
    "apiCalls"    : {
        "getlist"       :0,
        "addTask"       :0,
        "taskCompleted" :0,
        "totalApiCalls" :0
    }
    },
{
    "name"        : "sachu",
    "toDoList"    : [],
    "apiCalls"    : {
        "getToDolist"   :0,
        "addTask"       :0,
        "taskCompleted" :0,
        "totalApiCalls" :0
    }
    }];
addUser("tittukey",usersDetails[0]);
addUser("richukey",usersDetails[1]);
addUser("sachukey",usersDetails[2]);
function addTask(key,database,task){
    
    database[key]["toDoList"].push(task);
}
function removeArrayElement(array,value){
    var index = array.indexOf(value)
    array.splice(index,1)
}
function taskCompleted(key,database,task){
    removeArrayElement(database[key]["toDoList"],task)
}
function incrementApiCalls(key,database,api){
    database[key]["apiCalls"][api]++;
    database[key]["apiCalls"]["totalApiCalls"]++;
}
module.exports ={
    database,
    addUser,
    addTask,
    taskCompleted,
    incrementApiCalls
}