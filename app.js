const express = require("express");
const bodyParser = require("body-parser");
let app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.listen(3000,()=>{
    console.log("server ruunning on port 3000")
});
app.get("/url",(req,res,next)=>{
    res.end("sukhamanode");
});
app.post("/key",(req,res)=>{
    var key = req.body.key
    console.log(key)
});