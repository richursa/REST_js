const request = require('request');
const constant = require('./constants/constant');

function addTask() {
  return process.argv[2] === constant.ADD_TASK;
}

function taskCompleted() {
  return process.argv[2] === constant.TASK_COMPLETED;
}

function getApiCallCount() {
  return process.argv[2] === constant.GET_API_CALL_COUNT;
}

function getToDoList() {
  return process.argv[2] === constant.GET_TO_DO_LIST;
}
function help() {
  return process.argv[2] === HELP;
}
try {
  if (getToDoList()) {
    if (process.argv[3]) {
      constant.options.headers[constant.TO_DO_KEY] = process.argv[3];
      constant.options.url += constant.GET_TO_DO_LIST;
      request.get(constant.options, (error, response, body) => {
        console.log('Task List:');
        console.log(body);
      });
    } else {
      throw ('please enter api key as second argument\n eg: node client.js getToDoList api_key_here ');
    }
  } else if (addTask()) {
    if (process.argv[3]) {
      constant.options.headers[constant.TO_DO_KEY] = process.argv[3];
      constant.options.url += constant.ADD_TASK;
      if (process.argv[4]) {
        constant.options.json[constant.TASK] = process.argv[4];
      } else {
        throw ('please enter a task to be added \n eg: node client.js addTask api_key_here task_name_here');
      }
      request.post(constant.options, (error, response, body) => {
        console.log(body);
      });
    }
  } else if (taskCompleted()) {
    if (process.argv[3]) {
      constant.options.headers[constant.TO_DO_KEY] = process.argv[3];
      constant.options.url += constant.TASK_COMPLETED;
      if (process.argv[4]) {
        constant.options.json[constant.TASK_COMPLETED] = process.argv[4];
      } else {
        throw ('please enter a task to be removed \n eg: node client.js taskCompleted api_key_here task_name_here');
      }
      request.post(constant.options, (error, response, body) => {
        console.log(body);
      });
    }
  } else if (getApiCallCount()) {
    if (process.argv[3]) {
      constant.options.headers[constant.TO_DO_KEY] = process.argv[3];
      constant.options.url += constant.GET_API_CALL_COUNT;
    } else {
      throw ('please enter api key like node client.js getAPIcallCount api_key_here');
    }
    request.get(constant.options, (error, response, body) => {
      console.log(body);
    });
  } else if (help()) {
    throw ('valid commands are getToDoList , getAPIcallCount , addTask , taskCompleted');
  } else {
    throw ('invalid command  run with --help for more info');
  }
} catch (err) {
  console.log(err);
}
