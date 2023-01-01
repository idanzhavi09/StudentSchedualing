import './index.css'
import React, { useEffect, useState }  from 'react';
import onoacademic from '../../images/onoacademic.png';
import BackButton from '../BackButton';
import Timetable from 'react-timetable-events'
import Modal from "react-modal";
import Schedule from '../TimeTable';
const uuid = require('uuid');
const axios = require('axios').default;
Modal.setAppElement("#root");


const handleSubmitCourse = (e) => {
  console.log('New Submission');
}



class CourseClass{
  constructor(courseName , lecturer , startTime , endTime , id , dayOfWeek) {
    this.courseName = courseName;
    this.lecturer = lecturer;
    this.startTime = startTime;
    this.endTime = endTime;
    this.id = id;
    this.dayOfWeek = dayOfWeek;
  }
}


const Assignment = () => {
        const [isAddOpen, setIsAddOpen] = useState(false);

      
        const [lessonsArr , setLessons] = useState({
          ראשון:[],
          שני:[],
          שלישי:[],
          רביעי:[],
          חמישי:[],
          שישי:[],
        });

        useEffect(() => {
          axios({
            method:'post',
            url:'/getClasses',
          }).then((res) => {
            res.data.map((Course) => {
              let title = Course.courseName + '\n' + Course.lecturer + '\n' + Course.startTime + '-' + Course.endTime;
              let startTime = '2022-12-25T' + Course.startTime.substring(11);
              let endTime = '2022-12-25T' + Course.endTime.substring(11);
              switch (Course.dayOfWeek) {
                case 1:
                  setLessons(lessonsArr.ראשון.push({id:1 , name:title , type:"custom" , startTime:new Date(startTime) , endTime:new Date(endTime)}));
                  break;

                case 2:
                  setLessons(lessonsArr.שני.push({id:uuid() , name:title , type:"custom" , startTime:startTime , endTime:endTime}))
                  break;

                case 3:
                  setLessons(lessonsArr.שלישי.push({id:uuid() , name:title , type:"custom" , startTime:startTime , endTime:endTime}))
                
                case 4:
                  setLessons(lessonsArr.רביעי.push({id:uuid() , name:title , type:"custom" , startTime:startTime , endTime:endTime}));
                  break;

                case 5:
                  setLessons(lessonsArr.חמישי.push({id:uuid() , name:title , type:"custom" , startTime:startTime , endTime:endTime}));
                  break;
                
                case 6:
                  setLessons(lessonsArr.שישי.push({id:uuid() , name:title , type:"custom" , startTime:startTime , endTime:endTime}));

                  default:
                  break;
              }

              console.log(lessonsArr.ראשון);
            })
          })
        } ,[])


        function toggleAddModal(){
          setIsAddOpen(!isAddOpen);
        }
        return(
            <>
            <main>
                <img id='onoLogo' src={onoacademic} alt="ono" />
                <BackButton />
                <section className='glass'>
                    <h1 className='title'>מסך שיבוצים</h1>
                    <br />
            {/* <Timetable 
            events={{
              "ראשון": lessonsArr.ראשון,
              "שני": lessonsArr.שני,
              "שלישי":lessonsArr.שלישי,
              "רביעי":lessonsArr.רביעי,
              "חמישי":lessonsArr.חמישי,
              "שישי":lessonsArr.שישי,
            }}
              style={{ 
              position:'absolute',
              bottom:'0',
              height: '500px',
              width:'100%',
               }}/> */}
  <Schedule />

                </section>
            </main>
            <div className='circle1'></div>
            <div className='circle2'></div>
            </>
        );
}

export default Assignment;
