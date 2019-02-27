# TO-DO_js
TO-DO_js is a simple to-do task app built with NodeJS.
# API CALLS::
# getToDoList 
returns the tasks left to complete .        
query sample        
endpoint:- 'hostname:3000/getToDoList'      
json raw request:-      
{       
    "key"   : "userkey"     
}       
# addTask
Add a task to the list            
endpoint:- 'hostname:3000/addTask'      
json raw request:-      
{       
    "key"   : "userkey",        
    "task"  : "taskToBeAdded"       
}       
# taskCompleted
Removes a task from the list        
endpoint:- 'hostname:3000/taskCompleted'        
json raw request:-      
{       
    "key"   : "userkey",        
    "taskCompleted"  : "taskToBeRemoved"        
}       
# getAPIcallCount       
Query returns the individual list of api calls made     
endpoint:- 'hostname:3000/getAPIcallCount'      
json raw request:-      
{       
    "key"   : "userkey"         
}       
# Usage 
On terminal type
```bash
        node app.js
```
to get the server running
