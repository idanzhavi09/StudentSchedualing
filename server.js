//imports and variables
const express = require('express');
const app = express();
const path = require('path');
var Connection = require('tedious').Connection;  
var Request = require('tedious').Request;  
var TYPES = require('tedious').TYPES;
const fs = require('fs');
require('dotenv').config();
const axios = require('axios').default
const cors = require('cors');
const bodyParser = require('body-parser');
const https = require('https')
const logger = require('morgan');


app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );
  app.use(bodyParser.json());
  app.use(logger('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));

var config = {  
  server: process.env.SERVER,  //update me
  authentication: {
      type: 'default',
      options: {
          userName: process.env.USER_NAME, //(lior's line)
          password: process.env.PASSWORD,  //(lior's line)
      }
  },
  options: {
      // If you are on Microsoft Azure, you need encryption:
      encrypt: true,
      database: 'gril'  //update me
  }
};

var connection = new Connection(config);

// Attempt to connect and execute queries if connection goes through
connection.on("connect", err => {
  if (err) {
    console.error(err.message);
  }
  else{
    console.log('successful');
    console.log('Getting Lecturers...');
    getLecturers();

    app.post('/delLecturer' , (req, res) => {
        console.log('RECIEVED REQUEST TO DELETE LECTURER');
        delLecturer(req.body.lecturerID);
        res.send('OK');
    })
    app.post('/addLecturer' , (req, res) => {
        console.log('RECIEVED REQUEST TO ADD LECTURER');
        let id = req.body.lecturerID;
        let name = req.body.lecturerName;
        let type= req.body.lecturerType;
        console.log(type + " " + name + " " + id);
        console.log('STARTED ADDING LECTURER...');
        addLecturer(id , name , type);

    })

  }
});



connection.connect();

 function getLecturers(){
    let request = new Request('SELECT TOP (1000) [LecturerID],[LecturerName],[LecturerType] FROM [dbo].[Lecturer]' , function(err) {
        if(err){
            console.log(err);
        }
    });
    var result = [];
    request.on('row',function(columns){
        columns.forEach(function(column){
            if(column.value === null){
                console.log('NULL');
            }
            else{
                result.push("'" + column.value + "'");
                        }
        });
        fs.writeFileSync('./src/lecturers.js' ,'var lecturers = ' + "[" +  result + "]"  + '\n' + 'module.exports = {lecturers,}');

        return result;

    });

    request.on('done', function(rowCount, more) {  
        console.log('DONE');
        console.log(rowCount + ' rows returned');  
        });  
        
    // Close the connection after the final event emitted by the request, after the callback passes
    request.on("requestCompleted", function (rowCount, more) {
        });
    connection.execSql(request);  
    

    }

function delLecturer(LecturerID){
    console.log('DELETING LECTURER...');
    let request = new Request('DELETE FROM [dbo].[Lecturer] WHERE [LecturerID] = ' + LecturerID , function(err){
        if(err){
            console.log(err);
        }else{
            request.on('done', function(rowCount, more) {  
                console.log('FINISHED DELETING LECTURER');
                console.log(rowCount + ' rows returned');  
                });  

            request.on("requestCompleted", function (rowCount, more) {
                console.log('REQUEST COMPLETED');
                });
               
        }
    });
    connection.execSql(request);  
}

function addLecturer(lecturerID , lecturerName , lecturerType){
    console.log('ADDING LECTURER...');
    let request = new Request('INSERT INTO [dbo].[Lecturer] VALUES(' + lecturerID + ',' + lecturerName + ',' + lecturerType + ')' , function(err){
        if(err){
            console.log(err);
        }
        else{
            request.on('done' , function(rowCount, more) {
                console.log('FINISHED ADDING LECTURER');
            });
            request.on('requestCompleted' , function(rowCount, more) {
                console.log('REQUEST COMPLETED');
            })
        }
    });
    connection.execSql(request);  

}

app.use(express.static("build"));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });



app.listen(3000 , ()=> {
    console.log('listening on port 3000');
})

