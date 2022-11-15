import onoacademic from '../../images/onoacademic.png';
import React  from 'react';
import { useState } from 'react';
import Modal from "react-modal";



require('./index.css');
const axios = require('axios').default;
var lecturerSelected;


Modal.setAppElement("#root");

class Lecturer{
    constructor(lecturerName , lecturerID , lecturerType){
        this.lecturerName = lecturerName;
        this.lecturerID = lecturerID;
        this.lecturerType = lecturerType;
    }
}

const lecturers = require('../../../lecturers');
var lecturersArray = [];
for(let i = 1; i < lecturers.lecturers.length; i = i +3){
    lecturersArray.push(lecturers.lecturers[i]);
}

var lecturersObjArray = [];
for(let i = 0; i< lecturers.lecturers.length - 1; i = i + 3){
    let id = lecturers.lecturers[i];
    let name = lecturers.lecturers[i + 1];
    let type = lecturers.lecturers[i + 2];
    lecturersObjArray.push(new Lecturer(name , id , type));
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
    const [isOpen, setIsOpen] = useState(false);

    function toggleModal() {
        setIsOpen(!isOpen);
      }

    let handleSelected = (e) => {
        setLecturerName(e.target.value);
        let lecturer = findLecturerByName(e.target.value);
        setLecturerID(lecturer.lecturerID);
        setLecturerType(lecturer.lecturerType)
        lecturerSelected = lecturer.lecturerID.toString();
        
    }

    return(
        <>
        <main>
            <img id='onoLogo' src={onoacademic} alt="ono" />
            <section className='glass'>
                <h1 className='title'>מסך מרצים</h1>
                <button id='btnDel' onClick={postDeleteLecturer} className='buttons'>מחק</button>
                <button id='btnUpdate' onClick={postUpdateLecturer} className='buttons'>עדכן</button>
                <button id='btnAdd' onClick={toggleModal} className='buttons'>הוסף</button>
                <Modal isOpen={isOpen} onRequestClose={toggleModal}contentLabel="My dialog" className="mymodal" overlayClassName="myoverlay">
                <input placeholder='שם מרצה:' type='name'></input>
                <input placeholder='מזהה מרצה' type={'number'}></input>

                </Modal>
                 <select className='lecturerSelector' onChange={handleSelected}>
                    <option>בחר מרצה</option>
                    {lecturersObjArray.map((lecturer) => <option>{lecturer.lecturerName}</option> )}
                 </select>

                 <p id='lecturerName'> שם מרצה: {lecturerName}</p>
                 <p id='lecturerID'>מזהה מרצה: {lecturerID}</p>
                 <p id='lecturerType'>סוג מרצה: {lecturerType}</p>
            

            </section>
            <p></p>
        </main>
        <div className='circle1'></div>
        <div className='circle2'></div>
        </>
    );
    
}

const postDeleteLecturer = () => {
    console.log('SENDING REQUEST TO DELETE LECTURER');
    axios({
        method:'post',
        url:'/delLecturer',
        data:{
            lecturerID:lecturerSelected,
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
            lecturerID:'2',
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