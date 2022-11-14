import React  from 'react';
import { useState } from 'react';
import './index.css';

const Lesson = () => {
    return(
        <>
            <div className='lessonContainer'>
                <p>שם קורס:</p>
                <p>שם מרצה:</p>
                <p>כיתה:</p>
                <p>אורך שיעור:</p>
            </div>
        </>
    );
}

export default Lesson;