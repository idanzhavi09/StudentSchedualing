import './index.css'
import React  from 'react';
import onoacademic from '../../images/onoacademic.png';
import BackButton from '../BackButton';
import Timetable from 'react-timetable-events'

const axios = require('axios').default;


const handleSubmitCourse = (e) => {
  console.log('New Submission');
}

const Assignment = () => {

        return(
            <>
            <main>
                <img id='onoLogo' src={onoacademic} alt="ono" />
                <BackButton />
                <section className='glass'>
                    <h1 className='title'>מסך שיבוצים</h1>
                    <br />
  <Timetable 
  events={{
    ראשון: [
      {
        id:'2',
        name:'Hello',
        type:'Custom',
        startTime:new Date("2018-02-22T11:30:00"),
        endTime:new Date("2018-02-22T16:30:00")
      },
    ],
    שני: [
      {
        id: 1,
        name: "Custom Event 1",
        type: "custom",
        startTime: new Date("2018-02-23T11:30:00"),
        endTime: new Date("2018-02-23T13:30:00"),
      },
    ],
    שלישי: [],
    רביעי: [],
    חמישי: [],
    שישי: [],
  }}
  style={{ 
    position:'absolute',
    bottom:'0',
    height: '500px',
    width:'100%',
    }}

/>

                </section>
            </main>
            <div className='circle1'></div>
            <div className='circle2'></div>
            </>
        );
}

export default Assignment;
