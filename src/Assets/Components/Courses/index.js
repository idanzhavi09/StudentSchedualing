import onoacademic from '../../images/onoacademic.png';
import React  from 'react';
import { useState } from 'react';
import Lesson from '../Lesson/index';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import "intersection-observer";
import { ScrollView } from "@cantonjs/react-scroll-view";
import BackButton from '../BackButton';
import Modal from "react-modal";
const axios = require('axios').default;


require('./index.css');
Modal.setAppElement("#root");

class CourseClass{
    constructor(courseId,courseName , courseFacultyId , coursePCI){
        this.courseId = courseId;
        this.courseName = courseName;
        this.courseFacultyId = courseFacultyId;
        this.coursePCI = coursePCI;
    }
}


const Courses = () => {
    // function getCourses () {
    //     axios({
    //         method:'post',
    //         url:'/getCourses',
    //     }).then(response => {setCoursesArr(response.data)})
    // }
    // getCourses();

    const [value, setValue] = useState(new Date());
    const [CoursesArr , setCoursesArr] = useState(new Array);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isUpdateOpen , setUpdateOpen] = useState(false);
    const [addCourseName , setAddCourseName] = useState("");
    const [addFacultyId , setAddFacultyId] = useState("");
    const [addPCI , setAddPCI] = useState("");
    const [Course , setCourse] = useState();
    const [dayOfWeek , setDayOfWeek] = useState(0);

    function onChange(nextValue){

        
        let jsDate = new Date();
        let date = nextValue.toLocaleDateString()
        console.log('fixed:' + date);
        let dateArr = date.split('.');
        jsDate.setDate(dateArr[0]);
        jsDate.setMonth(dateArr[1] - 1);
        jsDate.setFullYear(dateArr[2]);
    
        let dayOfWeekin = jsDate.getDay() + 1;

        setDayOfWeek(dayOfWeekin)
        setValue(nextValue);
        console.log(nextValue);
        axios({
            method:'post',
            url:'/getLessons',
            data:{
                dateRequested:nextValue.toLocaleDateString(),
            }
        }).then((res)=> console.log('LESSONS RETRIEVED' + '\n' + res))
        .catch((err)=> console.log('ERROR:' + err))
    }

    function toggleAddModal() {
        setIsAddOpen(!isAddOpen);
      }
    
    function toggleUpdateModal() {
        setUpdateOpen(!isUpdateOpen);
    }

    function handleChangeAddName(e){
        setAddCourseName(e.target.value);
    }
    function handleChangeAddFacultyId(e){
        setAddFacultyId(e.target.value)
    }
    function handleChangeAddPCI(e){
        setAddPCI(e.target.value);
    }
    function handleAddClick(e){
        axios({
            method:'post',
            url:'/addCourse',
            data:{
                courseName:addCourseName,
                courseFacultyId:addFacultyId,
                coursePCI:addPCI,
            }
        }).then(response => ()=>{if(response.status === 200){console.log('FINISHED ADDING LECTURER')} else{console.log( ' \n' + 'status:' + response.status);}})
    };

    let coursesForEachDay = [
        {
        CourseName:'מבני נתונים',
        lecName:'עידן זהבי',
        classroom:'445',
        time:'4:15',
        dayOfWeek:'1'
        },
        {
        CourseName:'אלגוריתמים',
        lecName:'רואי אלאור',
        classroom:'327',
        time:'4:15',
        dayOfWeek:'2',
        },
        {
        CourseName:'מבני נתונים',
        lecName:'אהרון',
        classroom:'445',
        time:'4:15',
        dayOfWeek:'3',
        },
        {
        CourseName:'יזמות',
        lecName:'רואי אלאור',
        classroom:'327',
        time:'4:15',
        dayOfWeek:'4',
        },
        {
        CourseName:'סייבר ואבטחת מידע',
        lecName:'רואי אלאור',
        classroom:'327',
        time:'4:15',
        dayOfWeek:'5',
        },
]

    return(
        <>
            <main>
                <img id='onoLogo' src={onoacademic} alt="ono" />
                <BackButton />
                <section className='glass'>
                    <h1 className='title'>מסך קורסים</h1>
                    <Calendar id='calendar' onChange={onChange} onClickDay={()=> {console.log(value)}} value={value}/>
                    <div className='lessons'>
                    <ScrollView style={{ height: '100vh' }}>
                    {coursesForEachDay.map(lesson => {if(lesson.dayOfWeek==dayOfWeek) {return (<Lesson key={lesson.CourseName} courseName={lesson.CourseName} lecName={lesson.lecName} classroom={lesson.classroom} time={lesson.time} />)} })}
                    </ScrollView>
                    </div>
                    
                     <select className='courseSelector' /*onChange={handleSelected}*/>
                    <option>בחר קורס</option>
                    {CoursesArr.map((course) => <option>{course.courseName}</option>)}
                    </select> 

                    <button id='btnDel' /*onClick={postDelteCourse}*/ className='buttons'>מחק</button>
                    <button id='btnUpdate' onClick={toggleUpdateModal} className='buttons'>עדכן</button>
                    <button id='btnAdd' onClick={toggleAddModal} className='buttons'>הוסף</button>

                    <Modal isOpen={isAddOpen} onRequestClose={toggleAddModal}contentLabel="My dialog" className="mymodal" overlayClassName="myoverlay">
                        <input type={'text'} onChange={handleChangeAddName} placeholder='שם קורס'></input>
                        <input type={'text'} onChange={handleChangeAddFacultyId} placeholder='מזהה חוג'></input>
                        <input type={'text'} onChange={handleChangeAddPCI} placeholder='מזהה קורס אם'></input>
                        <button  onClick={handleAddClick}>הוסף</button>
                    </Modal>

                    <Modal isOpen={isUpdateOpen} onRequestClose={toggleUpdateModal}contentLabel="My dialog" className="mymodal" overlayClassName="myoverlay">
                        <input type={'text'} onChange={handleChangeAddName} placeholder='שם קורס'></input>
                        <input type={'text'} onChange={handleChangeAddFacultyId} placeholder='מזהה חוג'></input>
                        <input type={'text'} onChange={handleChangeAddPCI} placeholder='מזהה קורס אם'></input>
                        <button  /*onClick={handleUpdateClick}*/>עדכן</button>
                    </Modal>

                </section>
            </main>
            <div className='circle1'></div>
            <div className='circle2'></div>
        </>
    )
}

export default Courses;