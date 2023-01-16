import React from "react";
import './index.css'
import { useState, useEffect } from "react";
import TimeTable, { EventsList } from "react-timetable-events";
import axios from "axios";
import { randomUUID } from "crypto";
import { EventsListProps } from "react-timetable-events/dist/types";
import { isHtmlElement } from "react-router-dom/dist/dom";

let example: any = [{
  name: 'אלגוריתמים 1',
  startTime: new Date('2018-02-23T11:30:00'),
  endTime: new Date('2018-02-23T13:30:00'),
  id: '1',
  type: 'custom',
  dayOfWeek: 1
},
{
  name: 'Data structures',
  startTime: new Date('2018-02-23T16:00:00'),
  endTime: new Date('2018-02-23T22:00:00'),
  id: '1',
  type: 'custom',
  dayOfWeek: 1
},
{
  name: 'אבטחת מידע',
  startTime: new Date('2018-02-23T11:00:00'),
  endTime: new Date('2018-02-23T16:30:00'),
  id: '1',
  type: 'custom',
  dayOfWeek: 2
},
{
  name: 'בדידה',
  startTime: new Date('2018-02-23T17:00:00'),
  endTime: new Date('2018-02-23T22:30:00'),
  id: '1',
  type: 'custom',
  dayOfWeek: 2
},
{
  name: 'מבוא למדמ"ח',
  startTime: new Date('2018-02-23T11:00:00'),
  endTime: new Date('2018-02-23T13:30:00'),
  id: '1',
  type: 'custom',
  dayOfWeek: 3
},
{
  name: 'יזמות וחדשנות',
  startTime: new Date('2018-02-23T17:00:00'),
  endTime: new Date('2018-02-23T22:30:00'),
  id: '1',
  type: 'custom',
  dayOfWeek: 4
},
{
  name: 'רשתות',
  startTime: new Date('2018-02-23T13:00:00'),
  endTime: new Date('2018-02-23T17:30:00'),
  id: '1',
  type: 'custom',
  dayOfWeek: 5
},
{
  name: 'אינפי 1',
  startTime: new Date('2018-02-23T17:00:00'),
  endTime: new Date('2018-02-23T22:30:00'),
  id: '1',
  type: 'custom',
  dayOfWeek: 6
},

]

const Schedule: React.FC<{}> = ({ }) => {
  const [events, setEvents] = React.useState({})

  interface Course {
    title: string;
    startTime: Date;
    endTime: Date;
    dayOfWeek: number;
  }

  interface Event {
    id: number | string;
    name: string;
    startTime: Date;
    endTime: Date;
    type?: string;
    [key: string]: unknown;
  }

  interface Events {
    [day: string]: Event[];
  }


  let events2: Events = {
    "sunday": [],
    "monday": [],
    "tuesday": [],
    "wednesday": [],
    "thursday": [],
    "friday": [],
  }

  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
  ]

  let DegreesArray = [];

  useEffect(() => {
    var obj: any = {};
    example.forEach((itm: any) => {
      let findDataOfDay = example.filter((ele: any) => ele.dayOfWeek === itm.dayOfWeek)
      let formatAr:any = []
      findDataOfDay.forEach((element: any) => {
        formatAr.push({
          name: itm.name,
          startTime: itm.startTime,
          endTime: itm.endTime,
          id: itm.id,
          type: itm.type,
        })
      });
      obj[days[itm.dayOfWeek]] = formatAr
    })
    console.log("obj", obj);
    setEvents(obj);

    

    // axios({
    //   method: 'post',
    //   url: '/getClasses',
    // }).then((res) => {
    //   let data = res.data;
    //   console.log(data);

    //   let courseArray: Course[];
    //   data.map((val: any): Course => ({
    //     title: val.courseName + '\n' + val.lecturer,
    //     startTime: val.startTime,
    //     endTime: val.endTime,
    //     dayOfWeek: val.dayOfWeek,
    //   }))





    // Courses.map((Course : Course) => {
    //   console.log(Course);

    //   switch (Course.dayOfWeek){
    //     case 1:
    //       events.sunday.push({
    //         id: '1',
    //         name:Course.title,
    //         startTime:new Date(Course.startTime),
    //         endTime:new Date(Course.endTime),
    //       })
    //       console.log('e:' +JSON.stringify(events.sunday));

    //       break;

    //     case 2:
    //       events.monday.push({
    //         id:'1',
    //         name:Course.title,
    //         startTime:new Date(Course.startTime),
    //         endTime:new Date(Course.endTime),
    //         type:'custom',
    //       })
    //       break;

    //       case 3:
    //         events.tuesday.push({
    //           id:'1',
    //           name:Course.title,
    //           startTime:new Date(Course.startTime),
    //           endTime:new Date(Course.endTime),
    //           type:'custom',
    //         })
    //         break;

    //         case 4:
    //           events.wednesday.push({
    //             id:'1',
    //             name:Course.title,
    //             startTime:new Date(Course.startTime),
    //             endTime:new Date(Course.endTime),
    //             type:'custom',
    //           })
    //           break;

    //         case 5:
    //           events.thursday.push({
    //             id:'1',
    //             name:Course.title,
    //             startTime:new Date(Course.startTime),
    //             endTime:new Date(Course.endTime),
    //             type:'custom',
    //             })
    //           break;

    //         case 6:
    //           events.friday.push({
    //             id:'1',
    //             name:Course.title,
    //             startTime:new Date(Course.startTime),
    //             endTime:new Date(Course.endTime),
    //             type:'custom',
    //           })
    //             break;

    //   }

    // })

    // }).catch((err) => {
    //   console.log(err);
    // })
  }, [])



  return (
    <>
      <TimeTable events={events} style={{ height: '500px', width: '100%' }} />
    </>
  );
};


export default Schedule;