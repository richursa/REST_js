const express = require("express");         //express for handiling requests
const user = require('./user')              //user methods for performing database operations
const bodyParser = require("body-parser");  //to parse through api call 
const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());                 //use body parser as a middleware to handle post requests

app.listen(3000,()=>{                       //listen on port 3000 
    console.log("server running on port 3000")
});

app.post("/getToDoList",(request ,response)=>{      //return to do list when api requests with a valid key
    if(user.database[request.body.key]){
        //response.setHeader('Content-Type','application/json'); // ths kills response
        response.end(user.database[request.body.key]["toDoList"].toString());   //user details is mapped with key and details are sent to client
        user.incrementApiCalls(request.body.key,user.database,"getToDoList");   //increment the api call counter associated with user 
        user.writeDatabase('database.json',user.database);                      //write database back :TO-DO implement this on system exit 
    }
    else{
        response.end("no user with key '"+ request.body.key+ "'  found");       
    }
});

app.post("/addTask",(request , response)=>{         //add task to the user mapped with the specified key
    if(user.database[request.body.key]){
        try{
        user.addTask(request.body.key,user.database,request.body.task);     
        response.send("task " + request.body.task + " added");      
        }
        catch (err)
        {
            response.end("task already present");
        }
        user.incrementApiCalls(request.body.key,user.database,"addTask");
        user.writeDatabase('database.json',user.database);
    }
    else{
        response.end("no user with key '"+ request.body.key+ "'  found");
    }
});

app.post("/taskCompleted",(request , response)=>{       //delete task associated with the user mapped by the specified key
    if(user.database[request.body.key]){
        try {
        user.taskCompleted(request.body.key,user.database,request.body.taskCompleted);
        response.end("task "+request.body.taskCompleted+" completed");
        }
        catch (err){                                    //if task not present raise error 
            response.end(err.toString())
        }
        user.incrementApiCalls(request.body.key,user.database,"taskCompleted");
        user.writeDatabase('database.json',user.database);
    }
    else{
        response.end("no user with key '"+ request.body.key+ "'  found");
    }
});

app.post("/getAPIcallCount", (request ,response)=>{     //get the total number of api calls performed by the user with the specified key 
                                                        //NOTE:- querying the number of api calls doesnt increase the API call count
    if(user.database[request.body.key]){
        response.send(user.database[request.body.key]["apiCalls"]);
    }
    else{
        response.end("no user with key '"+ request.body.key+ "'  found");
    }
});
