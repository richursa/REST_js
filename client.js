const request = require('request');

var options = {
  url: 'http://localhost:3000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
};
const TO_DO_KEY = 'To-Do-Key';
const GET_TO_DO_LIST = 'gettodolist';
const ADD_TASK = 'addtask';
const TASK = 'task';
function addTask() {
  return process.argv[2] == ADD_TASK;
}


function getToDoList() {
  return process.argv[2] === GET_TO_DO_LIST;
}
try {
  if (getToDoList()) {
    if (process.argv[3]) {
      options.headers[TO_DO_KEY] = process.argv[3];
      options.url += GET_TO_DO_LIST;
      request.get(options, (error, response, body) => {
        console.log('Task List:');
        console.log(body);
      });
    } else {
      throw ('please enter api key as second argument\n eg: node client.js gettodolist api_key_here ');
    }
  } else if (addTask()) {
    if (process.argv[3]) {
      options.headers[TO_DO_KEY] = process.argv[3];
      options.url += ADD_TASK;
      if (process.argv[4]) {
        options.json[TASK] = process.argv[4];
      } else {
        throw ('please enter a task to be added \n eg: node client.js addtask api_key_here task_name_here');
      }
      request.post(options, (error, response, body) => {
        console.log(body);
      });
    }
  } else {
    throw ('invalid command  run with --help for more info');
  }
} catch (err) {
  console.log(err);
}
