import onoacademic from '../../images/onoacademic.png';
import React  from 'react';
import { useState } from 'react';
import Modal from "react-modal";
import Dialog from '../AddLecturerDialog';
var lecturerSelected;
require('./index.css');
const axios = require('axios').default;

Modal.setAppElement("#root");

class Lecturer{
    constructor(lecturerName , lecturerID , lecturerType , teachableCourses){
        this.lecturerName = lecturerName;
        this.lecturerID = lecturerID;
        this.lecturerType = lecturerType;
        this.teachableCourses = teachableCourses;
    }
}

const lecturers = require('../../../lecturers');
var lecturersArray = [];
for(let i = 1; i < lecturers.lecturers.length; i = i +3){
    lecturersArray.push(lecturers.lecturers[i]);
}

var lecturersObjArray = [];
for(let i = 0; i< lecturers.lecturers.length - 1; i = i + 4){
    let id = lecturers.lecturers[i];
    let name = lecturers.lecturers[i + 1];
    let type = lecturers.lecturers[i + 2];
    let teachableCourses = lecturers.lecturers[i + 3]
    lecturersObjArray.push(new Lecturer(name , id , type , teachableCourses));
}

function findLecturerByName(name){
    for(let i = 0; i < lecturersObjArray.length; i++){
        if(lecturersObjArray[i].lecturerName === name){
            return lecturersObjArray[i];
        }
    }
}


            
const Lecturers = () => {
    const [value, onChange] = useState(new Date());
    const [lecturerName , setLecturerName] = useState("")
    const [lecturerID ,setLecturerID] = useState("")
    const [lecturerType , setLecturerType] = useState("")
    const [teachableCourses , setTeachableCourses] = useState("")
    const [updateName , setUpdateName] = useState("")
    const [updateType , setUpdateType] = useState("")
    const [updateTC , setUpdateTC] = useState("")
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [isUpdateOpen , setUpdateOpen] = useState(false);



    function toggleAddModal() {
        setIsAddOpen(!isAddOpen);
      }
    
    function toggleUpdateModal() {
        setUpdateOpen(!isUpdateOpen);
    }

    let handleSelected = (e) => {
        setLecturerName(e.target.value);
        let lecturer = findLecturerByName(e.target.value);
        setLecturerID(lecturer.lecturerID);
        setLecturerType(lecturer.lecturerType)
        setTeachableCourses(lecturer.teachableCourses);
        lecturerSelected = lecturer.lecturerID.toString();
        
    }
    function handleChangeName(e){
        setUpdateName(e.target.value);
    }

    function handleChangeField(e){
        setUpdateType(e.target.value)
    }

    function handleChangeCourses(e){
        setUpdateTC(e.target.value);
    }
    

    return(
        <>
        <main>
            <img id='onoLogo' src={onoacademic} alt="ono" />
            <section className='glass'>
                <h1 className='title'>מסך מרצים</h1>
                <button id='btnDel' onClick={postDeleteLecturer} className='buttons'>מחק</button>
                <button id='btnUpdate' onClick={toggleUpdateModal} className='buttons'>עדכן</button>
                <button id='btnAdd' onClick={toggleAddModal} className='buttons'>הוסף</button>

                <Modal isOpen={isAddOpen} onRequestClose={toggleAddModal}contentLabel="My dialog" className="mymodal" overlayClassName="myoverlay">
                    <Dialog />
                </Modal>

                <Modal isOpen={isUpdateOpen} onRequestClose={toggleUpdateModal} contentLabel="Update Dialog" className="mymodal"overlayClassName="myoverlay">
                    <input type={'text'} onChange={handleChangeName} placeholder='שם מרצה'></input>
                    <input type={'text'} onChange={handleChangeField} placeholder='חוג מרצה'></input>
                    <input type={'text'} onChange={handleChangeCourses} placeholder='קורסים'></input>
                    <button onClick={handleUpdateClick} >עדכן!</button>
                </Modal>

                 <select className='lecturerSelector' onChange={handleSelected}>
                    <option>בחר מרצה</option>
                    {lecturersObjArray.map((lecturer) => <option>{lecturer.lecturerName}</option> )}
                 </select>

                 <p id='lecturerName'> שם מרצה: {lecturerName}</p>
                 <p id='lecturerID'>מזהה מרצה: {lecturerID}</p>
                 <p id='lecturerType'>סוג מרצה: {lecturerType}</p>
                 <p id='teachableCourses'>קורסים: {teachableCourses}</p>

            </section>
            <p></p>
        </main>
        <div className='circle1'></div>
        <div className='circle2'></div>
        </>
    );

    function handleUpdateClick() {
        console.log(updateTC);
        axios({
            method:'post',
            url:'/updateLecturer',
            data:{
                lecturerID:lecturerID,
                lecturerName:updateName,
                lecturerType:updateType,
                teachableCourses:updateTC,
            }
        }).then(() => {
            toggleUpdateModal();
        })


    }
    
}



const postDeleteLecturer = () => {
    console.log('SENDING REQUEST TO DELETE LECTURER');
    axios({
        method:'post',
        url:'/delLecturer',
        data:{
            lecturerID:'10',
        }
    }).then(()=> console.log('LECTURER DELETED'))
    .catch((err)=> console.log('ERROR:' + err))

}
const postAddLecturer = () => {
    console.log('SENDING REQUEST TO ADD LECTURER');
    axios({
        method:'post',
        url:'/addLecturer',
        data:{
            lecturerID:lecturerSelected,
            lecturerName:'Lior',
            lecturerType:'Lecturer'
        }
    })
}
const postUpdateLecturer = () => {
    console.log('SENDING REQUEST TO UPDATE LECTURER');
    // axios.post("http://localhost:3000//updateLecturer",{
    // lecturerID: lecturerID,
    // }) 
}

export default Lecturers;