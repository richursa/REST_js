const express = require("express");
const bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.listen(3000,()=>{
    console.log("server ruunning on port 3000")
});
app.get("/printTodo",(request,response,next)=>{
    response.end("ellam working aane")
});
app.post("/printTodo",(request ,response)=>{
    if(database[request.body.key]){
        response.end(database[request.body.key]["toDoList"].toString())

    }
    else{
        response.end("no user with "+ request.body.key+ " found");
    }
});