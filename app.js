const express = require("express");
let app = express();
app.listen(3000,()=>{
    console.log("server ruunning on port 3000")
});
app.get("/url",(req,res,next)=>{
    res.json(["richu","sachu","tittu","raghu"]);
});