import './index.css'
import React, { useEffect, useState ,Component }  from 'react';
import onoacademic from '../../images/onoacademic.png';
import BackButton from '../BackButton';
import {render} from 'react-dom'
import TimeTable from 'react-timetable-events';
import { EventsList } from 'react-timetable-events';
import Modal from "react-modal";
import moment from 'moment';
import Scheduler from '../Schedualer';
import Schedule from '../TimeTable';
import { Axios } from 'axios';
const uuid = require('uuid');
const axios = require('axios').default;
Modal.setAppElement("#root");



class CourseClass{
  constructor(courseName , lecturer , startTime , endTime , id , dayOfWeek) {
    this.courseName = courseName;
    this.lecturer = lecturer;
    this.startTime = startTime;
    this.endTime = endTime;
    this.id = id;
    this.dayOfWeek = dayOfWeek;
  }
}


const Assignment = () => {

        useEffect(() => {
          axios({
            method:'post',
            url:'/getDegrees',
          }).then((res) => {
            setDegrees(res.data);
          }).catch((err) => {
            console.log('ERROR:' + err);
          })
        } , [])

        const [isAddOpen, setIsAddOpen] = useState(false);
        const [degrees , setDegrees] = useState([]);
        let years = ['2020' , '2021' , '2022' , '2023'];
        function toggleAddModal(){
          setIsAddOpen(!isAddOpen);
        }

        function handleChangeYear(){

        }

        function handleChangeDegree(){

        }

        return(
            <>
            <main>
                <img id='onoLogo' src={onoacademic} alt="ono" />
                <BackButton />
                <select className='yearSelector' onChange={handleChangeYear}>
                  {years.map((year) => {return (<option value={year}>{year}</option>)})}
                </select>

                <select className='DegreeSelector' onChange={handleChangeDegree}>
                  {degrees.map((degree) => {return(<option value={degree}>{degree}</option>)})}
                </select>

                <button oncClick={toggleAddModal} className='btnAddClass'>הוסף</button>


                <section className='glass'>
                    <h1 className='title'>מסך שיבוצים</h1>
                    <Schedule />

                    <Modal isOpen={isAddOpen} onRequestClose={toggleAddModal} contentLabel="Add Dialog" className="mymodal"overlayClassName="myoverlay" >
                        <input />
                    </Modal>
                </section>
            </main>
            <div className='circle1'></div>
            <div className='circle2'></div>
            </>
        );
}

export default Assignment;
