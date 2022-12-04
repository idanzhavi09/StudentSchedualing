import React  from 'react';
import { useState } from 'react';
import './index.css';

const Lesson = (props) => {
    const {courseName , lecName , classroom , startTime , endTime} = props;
    return(
        <>
            <div className='lessonContainer'>
                <p>שם קורס: {courseName}</p>
                <p>שם מרצה:{lecName}</p>
                <p>כיתה:{classroom}</p>
                <p>שעת התחלה: {startTime}</p>
                <p>שעת סיום: {endTime}</p>
            </div>
        </>
    );
}

export default Lesson;