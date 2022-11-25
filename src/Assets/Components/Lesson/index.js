import React  from 'react';
import { useState } from 'react';
import './index.css';

const Lesson = (props) => {
    const {courseName , lecName , classroom , time} = props;
    return(
        <>
            <div className='lessonContainer'>
                <p>שם קורס: {courseName}</p>
                <p>שם מרצה:{lecName}</p>
                <p>כיתה:{classroom}</p>
                <p>אורך שיעור:{time}</p>
            </div>
        </>
    );
}

export default Lesson;