import onoacademic from '../../images/onoacademic.png';
import React  from 'react';
import { useState , useEffect} from 'react';
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

class LessonClass{
    constructor(courseName , lecturerName , classroom , startTime , endTime , dayOfWeek){
        this.courseName = courseName;
        this.lecturerName = lecturerName;
        this.classroom = classroom;
        this.startTime = startTime;
        this.endTime = endTime;
        this.dayOfWeek = dayOfWeek;
    }
}



const Courses = () => {


    const [value, setValue] = useState(new Date());
    const [CoursesArr , setCoursesArr] = useState([]);
    const [UpdatedCourseName , setUpdatedCourseName] = useState("");
    const [UpdatedCourseFacultyID , setUpdatedCourseFacultyID] = useState("");
    const [UpdatedCoursePCI , setUpdatedCoursePCI] = useState("");

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isUpdateOpen , setUpdateOpen] = useState(false);
    const [addCourseName , setAddCourseName] = useState("");
    const [addFacultyId , setAddFacultyId] = useState("");
    const [addPCI , setAddPCI] = useState("");
    const [Course , setCourse] = useState("");
    const [dayOfWeek , setDayOfWeek] = useState(0);
    const [classesArr , setClassesArr] = useState([]);
    const [facultyArr , setFacultyArr] = useState(new Array());


    useEffect(() => {
        async function getCoursesByFaculty(faculty){
            axios({
                method:'POST',
                url:'getCoursesByFaculty',
                data:{
                    "faculty":faculty,
                }
            }).then((res) => {
                setCoursesArr(res.data);
                console.log(res.data);
            }).catch((err) => {
                console.log('ERROR: ' + err);
            })        
        }

        getCoursesByFaculty('j');
    } , []);


     function onChange(nextValue){
        // useEffect(() => {
        //     setClassesArr([]);
        // } , [])
        console.log('Classes Array:' + classesArr);
        let jsDate = new Date();
        let date = nextValue.toLocaleDateString()
        let dateArr = date.split('.');
        jsDate.setDate(dateArr[0]);
        jsDate.setMonth(dateArr[1] - 1);
        jsDate.setFullYear(dateArr[2]);    
        let dayOfWeekin = jsDate.getDay() + 1;
        setDayOfWeek(dayOfWeekin)
        setValue(nextValue);
        axios({
            method:'post',
            url:'/getLessons',
            data: {
                dateRequested: nextValue.toLocaleDateString(),
            }
        })
        .then((res) => {
            for(let i = 0; i < res.data.length - 1; i += 11){
                let courseName = res.data[i + 3];
                let lecturerName = res.data[i + 1];
                let classroom = res.data[i + 7];
                let startTime = res.data[i + 9];
                let endTime = res.data[i + 10];
                let dayOfWeek = res.data[i + 8];

                let lesson = new LessonClass(courseName , lecturerName , classroom , startTime , endTime , dayOfWeek);
                classesArr.push(lesson);
                
            }
            console.log('New Classes Array' + classesArr);
        })
        .catch((err) => {
            console.log('ERROR:' + err);
        })

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

    function handleChangeUpdateName(e){
        setUpdatedCourseName(e.target.value);
    }

    function handleChangeUpdateFacultyId(e){
        setUpdatedCourseFacultyID(e.target.value);
    }
    function handleChangeUpdatePCI(e){
        setUpdatedCoursePCI(e.target.value);
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
        }).then(response => ()=>{if(response.status === 200){console.log('FINISHED ADDING COURSE')} else{console.log( ' \n' + 'status:' + response.status);}})
    };

    function handleDelClick(e){
        axios({
            method:'post',
            url:'/delCourse',
            data:{
                courseName:Course,
            }
        }).then((res) => {
            console.log('RESULT:' + res.status);
        })
    }

    function handleUpdateClick(e){
        axios({
            method:'post',
            url:'/updateCourse',
            data:{
                courseName:Course,
                UpdatedCourseName:UpdatedCourseName,
                UpdatedCourseFacultyID:UpdatedCourseFacultyID,
                UpdatedCoursePCI:UpdatedCoursePCI,
            }
        }).then((res) => {
            if(res.status === 200){
                console.log('SUCCESSFUL UPDATE!');
            }
        }).catch((err) => {
            console.log('ERR: ' + err);
        })
    }

    function handleChangeCourseSelection(e){
        setCourse(e.target.value);
    }



    return(
        <>
            <main>
                <img id='onoLogo' src={onoacademic} alt="ono" />
                <BackButton />
                <section className='glass'>
                    <h1 className='title'>מסך קורסים</h1>
                    <Calendar id='calendar' onChange={onChange} value={value}/>
                    <div className='lessons'>
                    <ScrollView style={{ height: '100vh' }}>
                    {classesArr.map(lesson => {
                        if(lesson.dayOfWeek === dayOfWeek){
                            return(
                                <Lesson courseName={lesson.courseName} lecName={lesson.lecturerName} classroom={lesson.classroom} 
                                startTime = {lesson.startTime} endTime={lesson.endTime} />
                            )
                        }
                    })}
                    </ScrollView>
                    </div>
                    
                     <select className='courseSelector' onChange={handleChangeCourseSelection}>
                    <option>בחר קורס</option>
                    {CoursesArr.map((course) => <option>{course.toString()}</option>)}
                    </select> 

                    {/* <button id='btnDel' onClick={handleDelClick} className='buttons'>מחק</button> */}
                    <button id='btnUpdate' onClick={toggleUpdateModal} className='buttons'>עדכן</button>
                    <button id='btnAdd' onClick={toggleAddModal} className='buttons'>הוסף</button>

                    <Modal isOpen={isAddOpen} onRequestClose={toggleAddModal}contentLabel="My dialog" className="mymodal" overlayClassName="myoverlay">
                        <input type={'text'} onChange={handleChangeAddName} placeholder='שם קורס'></input>
                        <input type={'text'} onChange={handleChangeAddFacultyId} placeholder='מזהה חוג'></input>
                        <input type={'text'} onChange={handleChangeAddPCI} placeholder='מזהה קורס אם'></input>
                        <button  onClick={handleAddClick}>הוסף</button>
                    </Modal>

                    <Modal isOpen={isUpdateOpen} onRequestClose={toggleUpdateModal}contentLabel="My dialog" className="mymodal" overlayClassName="myoverlay">
                        <input type={'text'} onChange={handleChangeUpdateName} placeholder='שם קורס'></input>
                        <input type={'text'} onChange={handleChangeUpdateFacultyId} placeholder='מזהה חוג'></input>
                        <input type={'text'} onChange={handleChangeUpdatePCI} placeholder='מזהה קורס אם'></input>
                        <button  onClick={handleUpdateClick}>עדכן</button>
                    </Modal>

                </section>
            </main>
            <div className='circle1'></div>
            <div className='circle2'></div>
        </>
    )
}

export default Courses;