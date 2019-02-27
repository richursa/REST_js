var fs = require('fs')
var database = require("./database.json")
function addUser(key, usersDetails){
    database[key] = usersDetails;
}

/*var usersDetails = [{
    "name"      : "tittu",
    "toDoList" : ["dance","run"],
    "apiCalls"    : {
        "getToDoList"   :0,
        "addTask"       :0,
        "taskCompleted" :0,
        "totalApiCalls" :0
    }
    },
{
    "name"        : "richu",
    "toDoList"    : [],
    "apiCalls"    : {
        "getToDoList"   :0,
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
*/
function addTask(key,database,task){
    if(database[key]["toDoList"].indexOf(task)!=-1){
        throw "task already present"
    }
    database[key]["toDoList"].push(task);
}
function removeArrayElement(array,value){
    var index = array.indexOf(value)
    if(index!=-1){
    array.splice(index,1)
    }
    else{
        throw "task not present"
    }
}
function taskCompleted(key,database,task){
    removeArrayElement(database[key]["toDoList"],task)
}
function incrementApiCalls(key,database,api){
    database[key]["apiCalls"][api]++;
    database[key]["apiCalls"]["totalApiCalls"]++;
}
function writeDatabase(jsonFile,database){
    fs.writeFileSync(jsonFile,JSON.stringify(database),'utf8');
}
module.exports ={
    database,
    addUser,
    addTask,
    taskCompleted,
    writeDatabase,
    incrementApiCalls
}