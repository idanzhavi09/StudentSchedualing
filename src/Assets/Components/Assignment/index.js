import './index.css'
import React, { useEffect, useState ,Component }  from 'react';
import onoacademic from '../../images/onoacademic.png';
import BackButton from '../BackButton';
import {render} from 'react-dom'
import TimeTable from 'react-timetable-events';
import { EventsList } from 'react-timetable-events';
import Modal from "react-modal";
import moment from 'moment';
import Scheduler from '../Schedualer';
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

                    <Schedule />
                </section>
            </main>
            <div className='circle1'></div>
            <div className='circle2'></div>
            </>
        );
}

export default Assignment;
