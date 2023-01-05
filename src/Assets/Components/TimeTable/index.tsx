import React from "react";
import './index.css'
import { useState , useEffect } from "react";
import TimeTable, { EventsList } from "react-timetable-events";
import axios from "axios";
import { randomUUID } from "crypto";
import { EventsListProps } from "react-timetable-events/dist/types";

const Schedule: React.FC<{  }> = ({  }) => {

    interface Course {
      title:string;
      startTime:Date;
      endTime:Date;
      dayOfWeek:number;
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


      let events: Events ={
        "sunday": [],
        "monday":[],
        "tuesday":[],
        "wednesday":[],
        "thursday":[],
        "friday":[],
      }

      useEffect(() => {
        axios({
          method:'post',
          url:'/getClasses',
        }).then((res) => {
          let data = res.data;
          let courseArray : Course[];
          data.map((val : any) : Course => ({
            title:val.courseName + '\n' + val.lecturer,
            startTime:val.startTime,
            endTime:val.endTime,
            dayOfWeek:val.dayOfWeek,
          }))





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
          
        }).catch((err) => {
          console.log(err);
        })
      } ,[])

      events.sunday.push({
        name:'אלגוריתמים 1',
        startTime:new Date('2018-02-23T11:30:00'),
        endTime:new Date('2018-02-23T13:30:00'),
        id:'1',
        type:'custom'
      },
      {
        name:'Data structures',
        startTime:new Date('2018-02-23T16:00:00'),
        endTime:new Date('2018-02-23T22:00:00'),
        id:'1',
        type:'custom',
      })
      events.monday.push({
        name:'אבטחת מידע',
        startTime:new Date('2018-02-23T11:00:00'),
        endTime:new Date('2018-02-23T16:30:00'),
        id:'1',
        type:'custom',
      },
      {
      name:'בדידה',
      startTime:new Date('2018-02-23T17:00:00'),
      endTime:new Date('2018-02-23T22:30:00'),
      id:'1',
      type:'custom',
    },
      )

      
    
    return (
        <>
          <TimeTable events={events} style={{height:'500px' , width:'100%'}} />
        </>
    );
  };


export default Schedule;