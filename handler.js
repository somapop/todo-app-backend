const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();




app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", function (request, response) {
  // Get all the tasks form the database
  response.status(200).send("You requested all the tasks");
});

app.delete("/tasks/:taskId", function (request, response) {
  // delete the task with the given ID from the database
  const taskId = request.params.taskId;
  response.status(200).send(`Successfully deleted task ${taskId}`);
});

app.post("/tasks", function (request, response) {
  // Create the new task in thew database
  const task = request.body; 
  // {text: "hoover the car", completed: true, date: "2019-10-11"}
  response.status(201).send(`Successfully created ${task.text}`);
});

app.put("/tasks/:taskId", function (request, response) {
  // Update the task with the given ID from the database
  const taskId = request.params.taskId;
  const tasks = request.body; 
  /*response.status(200).send(`You have successfully updated the task ${tasks, taskId}`);*/

  response.status(200).send(`You have successfully updated the task ${taskId} with the text ${tasks.text} 
  on the date ${tasks.date}. Completed? ${tasks.completed}`);
});

module.exports.tasks = serverlessHttp(app);