const express = require('express')
const user = require('../user')  
const router = express.Router()
const util = require('util')

router.get("/getToDoList",(request ,response)=>{      //return to do list when api requests with a valid key
    if(user.database[request.get('To-Do-Key')]){      //api key is stored in http header To-Do-key to comply with http standards
        response.end(user.database[request.get('To-Do-Key')]["toDoList"].toString());   //user details is mapped with key and details are sent to client
        user.incrementApiCalls(request.get('To-Do-Key'),user.database,"getToDoList");   //increment the api call counter associated with user  
    }
    else{
        response.end("no user with key '"+ request.get('To-Do-Key')+ "'  found");       
    }
});


router.post("/addTask",(request , response)=>{         //add task to the user mapped with the specified key
    if(user.database[request.get('To-Do-Key')]){
        try{
        user.addTask(request.get('To-Do-Key'),user.database,request.body.task);     
        response.end("task " + request.body.task + " added");      
        }
        catch (err)
        {
            response.end("task already present");
        }
        user.incrementApiCalls(request.get('To-Do-Key'),user.database,"addTask");
        console.log(user.database)
        
    }
    else{
        response.end("no user with key '"+ request.get('To-Do-Key')+ "'  found");
    }
});

router.post("/taskCompleted",(request , response)=>{       //delete task associated with the user mapped by the specified key
    if(user.database[request.get('To-Do-Key')]){
        try {
        user.taskCompleted(request.get('To-Do-Key'),user.database,request.body.taskCompleted);
        response.end("task "+request.body.taskCompleted+" completed");
        }
        catch (err){                                    //if task not present raise error 
            response.end(err.toString())
        }
        user.incrementApiCalls(request.get('To-Do-Key'),user.database,"taskCompleted");
        
    }
    else{
        response.end("no user with key '"+ request.get('To-Do-Key')+ "'  found");
    }
});


router.get("/getAPIcallCount", (request ,response)=>{     //get the total number of api calls performed by the user with the specified key 
    //NOTE:- querying the number of api calls doesnt increase the API call count
if(user.database[request.get('To-Do-Key')]){
response.send(user.database[request.get('To-Do-Key')]["apiCalls"]);
}
else{
response.end("no user with key '"+ request.get('To-Do-Key')+ "'  found");
}
});


setInterval(()=>{                                       //write to db to file every 10 seconds 
                                                        //temporary hack 
                                                        //TO-DO: learn mongoDb
    util.log("writing asynchronously to database")
    user.writeDatabase('database.json',user.database);
    util.log("write completed")
},10000)
module.exports = router