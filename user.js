var database = {};
function addUser(key, usersDetails){
    database[key] = usersDetails;
}

var usersDetails = [{
    name      : "tittu",
    toDoList : ["dance","run"],
    apiCalls  : 0
    },
{
    name        : "richu",
    toDoList    : [],
    apiCalls    : 0
    },
{
    name        : "sachu",
    toDoList    : [],
    apiCalls    : []
    }];
addUser("tittukey",usersDetails[0]);
addUser("richukey",usersDetails[1]);
addUser("sachukey",usersDetails[2]);
function addTask(key,database,task){
    
    database[key][toDolist].push(task);
}
function removeArrayElement(array,value){
    var index = array.indexOf(value)
    array.splice(index,1)
}
function taskCompleted(key,database,task){
    removeArrayElement(database[key]["toDoList"],task)
}
module.exports ={
    database,
    addUser,
    addTask,
    taskCompleted
}