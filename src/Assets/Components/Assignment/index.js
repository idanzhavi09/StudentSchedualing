import './index.css'
import React, { useState }  from 'react';
import onoacademic from '../../images/onoacademic.png';
import BackButton from '../BackButton';
import Timetable from 'react-timetable-events'

const axios = require('axios').default;


const handleSubmitCourse = (e) => {
  console.log('New Submission');
}

const Assignment = () => {
        const [lessonsArr , setLessons] = useState({
          ראשון:[{}],
          שני:[{}],
          שלישי:[{}],
          רביעי:[{}],
          חמישי:[{}],
          שישי:[{}],
        });
        return(
            <>
            <main>
                <img id='onoLogo' src={onoacademic} alt="ono" />
                <BackButton />
                <section className='glass'>
                    <h1 className='title'>מסך שיבוצים</h1>
                    <br />
  <Timetable 
  events={lessonsArr}
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
