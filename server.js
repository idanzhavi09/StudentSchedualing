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
        let name = req.body.lecturerName;
        let type= req.body.lecturerType;
        let teachableCourses = req.body.lecturerTeachableClasses
        console.log(type + " " + name + " " + teachableCourses);
        console.log('STARTED ADDING LECTURER...');
        addLecturer(name , type , teachableCourses);

    })
    app.post('/getLessons' , (req , res) => {
        console.log('RECIVED REQUEST TO GET LESSONS BY DATE');
        console.log(req.body);
        res.send('Data recieved')
    })

    app.post('/getCourses' , (req,res) => {
        console.log('RECIEVED REQUEST TO RETRIEVE COURSES');

    })

    app.post('/updateLecturer' , (req ,res) => {
        console.log('RECIVED REQUEST TO UPDATE LECTURER');
        let id = req.body.lecturerID;
        let newName= req.body.lecturerName;
        let newType = req.body.lecturerType;
        let newteachableCourses = req.body.teachableCourses;
        console.log('id: ' + id + '\n' + 'name: ' + newName + '\n' + 'type: ' +newType  + '\n' + 'courses: ' + newteachableCourses);

        updateLecturer(id , newName , newType , newteachableCourses);
    })
    

  }
});



connection.connect();

 function getLecturers(){
    let request = new Request('SELECT TOP (1000) [LecturerID],[LecturerName],[LecturerType],[TeachableCourses] FROM [dbo].[Lecturer]' , function(err) {
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

function addLecturer( lecturerName , lecturerType , teachableCourses){
    console.log('ADDING LECTURER...');
    console.log('Name:' + lecturerName + ' , ' + 'Type:' + lecturerType + ' , ' + 'Courses:' + teachableCourses);
    let request = new Request('INSERT INTO [dbo].[Lecturer] (LecturerName,LecturerType,TeachableCourses) VALUES(' + "'" + lecturerName + "'" + ',' + "'" + lecturerType + "'" + ',' + "'" +  teachableCourses + "'" +')' , function(err){
        if(err){
            console.log(err);
        }
        else{
            request.on('done' , function(rowCount, more) {
                console.log('FINISHED ADDING LECTURER');
                console.log(rowCount + ' rows returned');  

            });
            request.on('requestCompleted' , function(rowCount, more) {
                console.log('REQUEST COMPLETED');
            })
        }
    });
    connection.execSql(request);  
}

function getCourses(){
    console.log('RETRIEVING COURSES...');
    let request = new Request('SELECT * [LecturerID],[LecturerName],[LecturerType] FROM [dbo].[Lecturer]' , function(err) {
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
                result.push(column.value);
            }
        });
        return result;
    });
}

function updateLecturer(id ,name , type , teachableCourses){
    console.log('UPDATING LECTURER...');
    let request = new Request('UPDATE [dbo].[Lecturer] SET [LecturerName] = ' + "'" + name + + "'" + ', ' + '[LecturerType] = ' +"'" + type + "'" + ', ' + '[TeachableCourses] = ' + "'" + teachableCourses + "'" +  'WHERE [LecturerID] = ' +  id , function(err) {
        if(err){
            console.log('ERROR: ' + err.name);
        }
        else{
            request.on('done' , function(rowCount, more) {
                console.log('FINISHED UPDATING LECTURER');
                console.log(rowCount + ' rows returned');  

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
});

