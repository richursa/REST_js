var database = {};

function addUser(key, usersDetails){
    database[key] = usersDetails;
}
addUser("sampleKey",usersDetails[0]);

var usersDetails = [{
    "name"      : "tittu",
    "apiCalls"  :  "0",
    "toDoList"  :   []
    "apiCall"   : 0
}]