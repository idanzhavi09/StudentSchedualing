import './index.css';
import React  from 'react';
import { useState } from 'react';
const axios = require('axios').default;




const Dialog = () => {

    const[lecturerName , setLecturerName] = useState("");
    const[lecturerType , setLecturerType] = useState("");
    const[lecturerTeachableClasses , setLecturerTeachableClasses] = useState("")

    function handleChangeName(e){
        setLecturerName(e.target.value);
    }

    function handleChangeField(e){
        setLecturerType(e.target.value)
    }

    function handleChangeCourses(e){
        setLecturerTeachableClasses(e.target.value);
    }

    return(
        <>
                <input className='lecturerNameInput' placeholder='שם מרצה:' onChange={handleChangeName} type={'text'}></input>
                <input className='lecturerFieldInput' placeholder='חוג מרצה:' onChange={handleChangeField} type={'text'}></input>
                <br />

                <label>אנא הכנס פסיק בין כל קורס</label>
                <input className='teachableCoursesInput' placeholder='הכנס קורסים' onChange={handleChangeCourses} type={'text'}></input>
                <button onClick={postAddLecturer}>לחץ עליי!</button>
        </>
    );
    function postAddLecturer(){
        console.log('SENDING REQUEST TO ADD LECTURER');
        axios({
            method:'post',
            url:'/addLecturer',
            data:{
                lecturerName:lecturerName,
                lecturerType:lecturerType,
                lecturerTeachableClasses:lecturerTeachableClasses,
            }
        })
    }
}


export default Dialog;