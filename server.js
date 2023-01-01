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
const { ok } = require('assert');
const { resolve } = require('path');
const { resetServerContext } = require('react-beautiful-dnd');
const { request } = require('http');
const { runInNewContext } = require('vm');

class CourseClass{
    constructor(courseName , lecturer , startTime , endTime , dayOfWeek) {
      this.courseName = courseName;
      this.lecturer = lecturer;
      this.startTime = startTime;
      this.endTime = endTime;
      this.dayOfWeek = dayOfWeek;
    }
  }

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
    getLecturers();
    console.log('GETTING LECTURERS...');


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
        async function getResult(){
            getCoursesOfDay(req.body.dateRequested).then((result) => {
                res.send(result);
            })
        }
        getResult();

    })

    app.post('/getCoursesByFaculty' , (req,res) => {
        console.log('RECIEVED REQUEST TO RETRIEVE COURSES');
        let faculty = req.body.faculty;
        async function getCourses(){
            getCoursesByFaculty(faculty).then((result) => {
                res.send(result);
            }).catch((err) => {
                res.send(err);
            })
        }
        getCourses();
    });

    app.post('/updateLecturer' , (req ,res) => {
        console.log('RECIVED REQUEST TO UPDATE LECTURER');
        let id = req.body.lecturerID;
        let newName= req.body.lecturerName;
        let newType = req.body.lecturerType;
        let newteachableCourses = req.body.teachableCourses;
        console.log('id: ' + id + '\n' + 'name: ' + newName + '\n' + 'type: ' +newType  + '\n' + 'courses: ' + newteachableCourses);

        updateLecturer(id , newName , newType , newteachableCourses);
    })

    app.post('/addCourse' , (req,res) => {
        console.log('RECIEVED REQUEST TO ADD COURSE');
        let courseName = req.body.courseName;
        let courseFacultyId = req.body.courseFacultyId;
        let coursePCI = req.body.coursePCI;
        console.log('name:' + courseName + '\n' + 'CFI:' + courseFacultyId + '\n' + 'PCI:'+ coursePCI);
        addCourse(courseName , courseFacultyId , coursePCI);
    })

    app.post('/delCourse' , (req,res) => {
        console.log('RECIEVED REQUEST TO DELETE COURSE');
        let courseName = req.body.courseName;
        delCourse(courseName);
        res.sendStatus(200);
    })

    app.post('/updateCourse' , (req , res) => {
        console.log('RECIEVED REQUEST TO UPDATE COURSE');
        let courseName = req.body.courseName;
        let updatedcourseName = req.body.UpdatedCourseName;
        let courseFacultyId = req.body.UpdatedCourseFacultyID;
        let coursePCI = req.body.UpdatedCoursePCI;
        async function startUpdateCourse(){
            updateCourse(courseName , updatedcourseName , courseFacultyId , coursePCI).then((result) => {
                if(result === 200) {
                    return 200;
                }
             }).catch((err) => {
                return err;
             })
            } 

        startUpdateCourse().then((result) => {
            res.send(result);
        }).catch((err) => {
            res.send(err);
        })
        
    })

    app.post('/getClasses' , (req , res) => {
        console.log('RECIEVED REQUEST TO RETRIEVE CLASSES');
        async function getClassesResult(){
            let results = await getClasses();
            console.log('RESULTS:' + results);
            return results;
        };
        getClassesResult().then((result) => {
            console.log('RETRIEVED RESULTS: ' + result);
            res.send(result);
        })
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

async function getCoursesByFaculty(faculty){
    console.log('RETRIEVING COURSES...');
    console.log(faculty);
    let promise = new Promise((resolve , reject) => {
        let result = [];
        console.log('IN PROMISE');
        let request = new Request('SELECT [CourseName] FROM [dbo].[Course]' , (err) => {
            if(err){
                console.log('Error:' + err);
            }
        })
            request.on('row' , ((columns) => {
                columns.forEach((column) => {
                    if(column.value === null || undefined) {
                        console.log('VALUE WAS NULL OR UNDEFINED');
                    }else{
                        result.push(column.value);
                    }
                })
            }))
            request.on('done' , (rowCount , more) => {
                console.log('DONE!');
            });
            request.on('requestCompleted' ,() => {
                console.log('REQUEST COMPLETED');
                if(result == null || undefined){
                    reject('result was null or undefined');
                }else{
                    resolve(result);
                }
            })


        connection.execSql(request);

    })
    return promise;
}

function updateLecturer(id ,name , type , teachableCourses){
    console.log('UPDATING LECTURER...');
    let request = new Request('UPDATE [dbo].[Lecturer] SET [LecturerName] = ' + "'" + name + "'" + ', ' + '[LecturerType] = ' +"'" + type + "'" + ', ' + '[TeachableCourses] = ' + "'" + teachableCourses + "'" +  ' WHERE [LecturerID] = ' +  id , function(err) {
        console.log(request);
        if(err){
            console.log('ERROR: ' + err);
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

async function getCoursesOfDay(date){
    let jsDate = new Date();
    let dateArr = date.split('.');
    jsDate.setDate(dateArr[0]);
    jsDate.setMonth(dateArr[1] - 1);
    jsDate.setFullYear(dateArr[2]);
    let dayOfWeek = jsDate.getDay();
    let promise = new Promise((resolve , reject) => {
    let result = [];
    let request = new Request(process.env.GET_LESSONS_OF_DAY , (err) => {
        if(err){
            console.log(err);
        }
    })
    request.on('error' , (err) => {
        console.log('ERROR: ' + err);
    })
    request.on('row' , (columns) => {
        columns.forEach((column) => {
            if(column.value === null) {
                console.log('NULL');
            }else{
                result.push(column.value)
            }
        })
    });
    request.on('done' , (rowCount , more) => {
        console.log('DONE!');
        console.log(rowCount + ' rows returned');
        console.log('MORE: ' + '\n' + more);
    })
    request.on('requestCompleted' , () => {
        console.log('REQUEST COMPLETED');
        if(result != null || undefined){
            resolve(result);
        }else{
            let err = new Error('result was either null or undefined')
            reject(err);
        }
    });
    connection.execSql(request);
    })
    return promise;
}

function addCourse(name , CFI , PCI){
    console.log('ADDING COURSE...');
    let request = new Request('INSERT INTO [dbo].[Course] (CourseName,FacultyID,ParentCourseID) VALUES(' + "'" + name + "'" +', ' + "'" + CFI + "'" + ',' + "'" + PCI + "'" + ')' , function(err){
        console.log(request);
        if(err){
            console.log('ERROR:' + err);
        }else{
            request.on('done' , function(rowCount , more){
                console.log('Rows returned' + rowCount);
            });
            request.on('requestCompleted' , () => {
                console.log('REQUEST COMPLETED');
            })
        }
    })

    connection.execSql(request);
}

function delCourse(courseName){
    console.log('STARTED TO DELETE COURSE');
        let request = new Request('DELETE FROM [dbo].[Course] WHERE [CourseName] = ' + courseName , (err) => {
            if(err){
                console.log('ERROR:' + err);
            }
        })
        request.on('done' , (rowCount, more) => {
            console.log('DONE!');
        })
        request.on('requestCompleted' , () => {
            console.log('REQUEST COMPLETED!');
        })
        connection.execSql(request);
}

function updateCourse(courseName , updatedCourseName , UpdatedCourseFacultyID , updatedCoursePCI){
    console.log('STARTING TO UPDATE LECTURER');
    let promise = new Promise((resolve , reject) => {
        let req = new Request('UPDATE [dbo].[Course] SET CourseName = ' + "'" + updatedCourseName + "'" +','
        + ' FacultyID = ' + "'" + UpdatedCourseFacultyID + "'" + ' ,' + 'ParentCourseID = ' + "'" + updatedCoursePCI + "'" + 
        'WHERE CourseName =' + "'" + courseName +"'" , (err) => {
           if(err){
               console.log('ERROR: ' + err);
           }else{
            console.log('NO ERROR');
           }
        });
        req.on('done' , (rowCount , more) => {
           console.log('DONE!');
        });
        req.on('requestCompleted' , () => {
           console.log('REQUEST COMPLETED!');
           resolve(200);
        });

        req.on('error' , (err) => {
            reject(err);
        })
   
        connection.execSql(req);
    })
    return promise;

}

async function getClasses(){
    let results = [];
    let promise = new Promise((resolve , reject) => {
        console.log('HELLO');
        let request = new Request(process.env.GET_LESSONS_OF_DAY , (err) => {
            if(err){
                console.log('ERROR: ' + err);
            }
        })
        request.on('row' , (columns) => {
            console.log('HELLO');
            columns.forEach((column) => {
                if(column.value === null || column.value === undefined){
                    console.log('COLUMN VALUE WAS EITHER NULL OR UNDEFINED');
                }else{
                    results.push(column.value);
                }
            })
        });
        request.on('done' , (rowCount , more) => {
            console.log('DONE!');
        })
        request.on('requestCompleted' , () => {
            console.log('REQUEST COMPLETED');
            let finalResults = [];
            if(results !== null){
                for(let i = 0; i < results.length - 1; i = i + 11){
                    let courseName = results[i + 3];
                    let lecturer = results[i + 1];
                    let startTime = results[i + 9];
                    let endTime = results[i + 10];
                    let dayOfWeek = results[i + 8];

                    let Course = new CourseClass(courseName , lecturer , startTime ,endTime , dayOfWeek);
                    finalResults.push(Course);
                }

                resolve(finalResults);
            }else{
                reject('RESULTS WERE NULL')
            }
        })
        connection.execSql(request);
    })
    return promise;
}



app.use(express.static("build"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
  });


app.listen(3000 , ()=> {
    console.log('listening on port 3000');
});

