var express = require('express')        //handles events
var bodyParser = require('body-parser') /
var app = express();
var api = require('./router/api.js') //all requests to endpoint starting with '/api' are handled
                                     //by a separate router to make code more modular and readable
app.use(bodyParser.json())          
app.use('/api',api)
app.listen(3000,()=>{                /
    console.log("started listening on port 3000")
})