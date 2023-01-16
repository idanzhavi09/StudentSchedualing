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


class scheduleBlockClass{
  constructor(scheduleBlockID , DayOfWeek , startTime , endTime ,RoomID , RoomName , Floor , BuildingName , CampusName , DegreeClassName 
    , DegreeName , FacultyName , SemesterID , DegreeClassID){
    this.scheduleBlockID = scheduleBlockID;
    this.DayOfWeek = DayOfWeek;
    this.startTime = startTime;
    this.endTime = endTime;
    this.RoomID = RoomID;
    this.RoomName = RoomName;
    this.Floor = Floor;
    this.BuildingName = BuildingName;
    this.CampusName = CampusName;
    this.DegreeClassName = DegreeClassName;
    this.DegreeName = DegreeName;
    this.FacultyName = FacultyName;
    this.SemesterID = SemesterID;
    this.DegreeClassID = DegreeClassID;
  }
}




const Assignment = () => {


        useEffect(() => {
          axios({
            method:'post',
            url:'/getDegrees',
          }).then((res) => {
            console.log('Degrees:' + res);
            setDegrees(res.data);
          }).catch((err) => {
            console.log('ERROR: ' + err);
          })
        } , [])

        const [isAddOpen, setIsAddOpen] = React.useState(false);
        const [degrees , setDegrees] = useState([]);
        const [DegreeName , setDegreeName] = useState("");
        const [scheduleBlockArr , setScheduleBlockArr] = React.useState([]);
        const [block , setBlock] = useState(Object);
        const [year , setYear] = useState("");



        let years = ['2020' , '2021' , '2022' , '2023'];
        function toggleAddModal(){
          setIsAddOpen(!isAddOpen);
        }

        function handleChangeYear(e){
          setYear(e.target.value);
        }

        async function getScheduleBlockDetails(DegreeName){
         return axios({
            method:'post',
            url:'/getScheduleBlock',
            data:{
              DegreeName:DegreeName,
            }
          }).then((res) => {
            console.log('axios res');
            console.log(res);
            return res
          }).catch((err) => {
            return err;
          })
        }

        async function handleChangeDegree(e){
          setDegreeName(e.target.value);
          let result = await getScheduleBlockDetails(DegreeName);
          setScheduleBlockArr(result.data);
        }

        function handleBlockChange(e){
          setBlock(e.target.value);
        }

        async function submitCoursePlacement(block){
          axios({
            method:'post',
            url:'/submitCoursePlacement',
            data:{
              block:block,
              degree:DegreeName,
            }
          }).then((res) => {
            console.log(res);
          }).catch((err) => {
            console.log(err);
          })
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

                <button onClick={toggleAddModal} className='btnAddClass'>הוסף</button>


                <section className='glass'>
                    <h1 className='title'>מסך שיבוצים</h1>

                    <Schedule />

                    <Modal isOpen={isAddOpen} onRequestClose={toggleAddModal} contentLabel="Add Dialog" className="mymodal" overlayClassName="myoverlay" >
                        <select className='scheduleBlockSelector' onChange={handleBlockChange}>
                          {scheduleBlockArr.map((block) => {
                            return(
                              <option value={block}>{block.ScheduleBlockID}</option>
                            )
                          })}
                        </select>
                        <p>זמן התחלה: {block.StartTime}</p>
                        <p>כיתה:{block.RoomID}</p>
                        <p>יום בשבוע: {block.DayOfWeek}</p>
                        <button onClick={submitCoursePlacement}></button>
                    </Modal>
                </section>
            </main>
            <div className='circle1'></div>
            <div className='circle2'></div>
            </>
        );
}

export default Assignment;
