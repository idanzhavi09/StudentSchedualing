import onoacademic from '../../images/onoacademic.png';
import React  from 'react';
import { useState } from 'react';
import Lesson from '../Lesson/index';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "intersection-observer";
import { ScrollView } from "@cantonjs/react-scroll-view";

require('./index.css');

const Courses = () => {

    const [value, setValue] = useState(new Date());

    function onChange(nextValue){
        setValue(nextValue);
        console.log(nextValue);
    }

    return(
        <>
            <main>
                <img id='onoLogo' src={onoacademic} alt="ono" />
                <section className='glass'>
                    <h1 className='title'>מסך קורסים</h1>
                    <Calendar id='calendar' onChange={onChange} value={value}/>
                    <div className='lessons'>
                    <ScrollView style={{ height: '100vh' }}>
                    <Lesson />
                    </ScrollView>
                    </div>

                </section>
            </main>
            <div className='circle1'></div>
            <div className='circle2'></div>
        </>
    )
}

export default Courses;