const express = require('express')        //handles events
const app = express();
const api = require('./router/api.js') //all requests to endpoint starting with '/api' are handled
                                     //by a separate router to make code more modular and readable
const bodyParser = require('body-parser')
app.use(bodyParser.json())          
app.use('/api',api)
app.listen(3000,()=>{                
    console.log("started listening on port 3000")
})