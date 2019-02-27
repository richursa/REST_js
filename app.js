const express = require("express");
const user = require('./user')
const bodyParser = require("body-parser");
var url = require('url')
const querystring = require('querystring')
let app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.listen(3000,()=>{
    console.log("server ruunning on port 3000")
});
app.post("/getToDoList",(request ,response)=>{
    if(user.database[request.body.key]){
        //response.setHeader('Content-Type','application/json'); // ths kills response
        response.end(user.database[request.body.key]["toDoList"].toString());
        user.incrementApiCalls(request.body.key,user.database,"getToDoList");
    }
    else{
        response.end("no user with key '"+ request.body.key+ "'  found");
    }
});
app.post("/addTask",(request , response)=>{
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
    }
    else{
        response.end("no user with key '"+ request.body.key+ "'  found");
    }
});
app.post("/taskCompleted",(request , response)=>{
    if(user.database[request.body.key]){
        try {
        user.taskCompleted(request.body.key,user.database,request.body.taskCompleted);
        request.end("task "+request.body.taskCompleted+" completed");
        }
        catch (err){
            response.end(err.toString())
        }
        user.incrementApiCalls(request.body.key,user.database,"taskCompleted");
    }
    else{
        response.end("no user with key '"+ request.body.key+ "'  found");
    }
});
app.post("/getAPIcallCount", (request ,response)=>{
    if(user.database[request.body.key]){
        //response.end(JSON.stringify({user.database[request.body.key]["apiCalls"]:1},null,3));
       // var api = user.database[request.body.key]["apiCalls"]
        response.send(user.database[request.body.key]["apiCalls"]);
    }
    else{
        response.end("no user with key '"+ request.body.key+ "'  found");
    }
});