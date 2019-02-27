const fs = require('fs')                    //file system library for reading and writing into database file
var database = require("./database.json")   //temporary database of user information
/*

function addUser(key, usersDetails){        //add a userDetailProperty to database object
    database[key] = usersDetails;
}

var usersDetails = [{                     //one time code used for creating the database,json file
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

function addTask(key,database,task){                    //add a task to the user with the specified key 
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

function taskCompleted(key,database,task){              //remove task from the user with the specified key
    removeArrayElement(database[key]["toDoList"],task)
}

function incrementApiCalls(key,database,api){           //increment the api call counter associaited with the current 
                                                        //api call and also increment total api call counter
    database[key]["apiCalls"][api]++;
    database[key]["apiCalls"]["totalApiCalls"]++;
}

function writeDatabase(jsonFile,database){              //write the database back to the file
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