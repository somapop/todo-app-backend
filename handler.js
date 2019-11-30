const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require ("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: 'todos'

});

const app = express();


app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", function (request, response) {
  // Get all the tasks form the database
  connection.query("SELECT * FROM Task", function (err, data) {
    if (err) {
      response.status(500).json({error: err});
    } else {
      
      response.status(200).json(data);
    }
});

});

app.delete("/tasks/:taskId", function (request, response) {
  // delete the task with the given ID from the database
  const taskId = request.params.taskId;
  // eacape user-provided values
  connection.query("DELETE from Task WHERE taskID = ?", [taskId], function (err, data) {
    if (err) {
      response.status(500).json({error: err});
    } else {
      response.sendStatus(200);
    }
  });  
});

app.post("/tasks", function (request, response) {
  // Create the new task in thew database
  const task = request.body; 
  // {text: "hoover the car", completed: true, date: "2019-10-11"}
  response.status(201).send(`Successfully created ${task.text}`);
});

app.put("/tasks/:taskId", function (request, response) {
  /* Update the task with the given ID from the database*/
  const taskId = request.params.taskId;
  const task = request.body; 
  /*response.status(200).send(`You have successfully updated the task ${tasks, taskId}`);*/
  //  {text: "I changed", completed: true, dateDue: "2019-11-10", dateCompleted: "2019-11-13"}
  const q = "UPDATE Task SET text = ?, completed = ?, dateDue = ?, dateCreated = ? WHERE taskId = ?";
  connection.query(q, [task.text, task.dateCreated, task.dateDue, task.completed, taskId], function (err, data) {
    if (err) {
      response.status(500).json({error: err})
    } else {
      response.status(205).json({task: data});

    }
  });


  // response.status(200).send(`You have successfully updated the task ${taskId} with the text ${tasks.text} 
  // on the date ${tasks.date}. Completed? ${tasks.completed}`);
  //...with the task...$(JSON.stringify(task)}`)
});

module.exports.tasks = serverlessHttp(app);