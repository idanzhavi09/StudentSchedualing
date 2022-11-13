import onoacademic from '../../images/onoacademic.png';
import React  from 'react';
import { useState } from 'react';

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


require('./index.css');



const Courses = () => {

    const [value, onChange] = useState(new Date());


    return(
        <>
            <main>
                <img id='onoLogo' src={onoacademic} alt="ono" />
                <section className='glass'>
                    <h1 className='title'>מסך קורסים</h1>
                    <Calendar id='calendar' onChange={onChange} value={value}/>
                </section>
            </main>
            <div className='circle1'></div>
            <div className='circle2'></div>
        </>
    )
}

export default Courses;