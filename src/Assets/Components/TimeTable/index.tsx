import React from "react";
import './index.css'
import { useState , useEffect } from "react";
import TimeTable from "react-timetable-events";
import axios from "axios";
import { randomUUID } from "crypto";

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

      const [sunday , setSunday] = useState<Event[]>([]);
      const [monday , setMonday] = useState<Event[]>([]);
      const [tuesday , setTuesday] = useState<Event[]>([]);
      const [wednesday , setWednesday] = useState<Event[]>([]);
      const [thursday , setThursday] = useState<Event[]>([]);
      const [friday , setFriday] = useState<Event[]>([]);

      useEffect(() => {
        axios({
          method:'post',
          url:'/getClasses',
        }).then((res) => {          
          let events = [];

          console.log(res.data);          
          
          for(let i = 0; i < res.data.length; i++){
            
            let title = res.data[i].courseName + '\n' + res.data[i].lecturer +'\n';
            let startTime = res.data[i].startTime.substring(0 , 19);
            let endTime = res.data[i].endTime.substring(0,19);
            let dayOfWeek = res.data[i].dayOfWeek;

            console.log('title:' + title + '\n');
            console.log('startTime:' + startTime + '\n');
            console.log('endTime:' + endTime + '\n');
            console.log('dayOfWeek:' + dayOfWeek);
            
            

            let course : Course = {
              title:title,
              startTime:startTime,
              endTime:endTime,
              dayOfWeek:dayOfWeek,
            }
            events.push(course);
            
          }

          console.log(events);
          

         events.map((Course :Course) => {            

            switch (Course.dayOfWeek){

              case 1:
                sunday.push({
                  id:'1',
                  name:Course.title,
                  startTime:Course.startTime,
                  endTime:Course.endTime,
                  type:'Custom'
                })
                break;

              case 2:
                monday.push({
                  id:randomUUID(),
                  name:Course.title,
                  startTime:Course.startTime,
                  endTime:Course.endTime,
                  type:'Custom',
                })
                break;
              
              case 3:
                tuesday.push({
                  id:randomUUID(),
                  name:Course.title,
                  startTime:Course.startTime,
                  endTime:Course.endTime,
                  type:'Custom',
                })
                break;

              case 4:
                wednesday.push({
                  id:randomUUID(),
                  name:Course.title,
                  startTime:Course.startTime,
                  endTime:Course.endTime,
                  type:'Custom',
                })
                break;

              case 5:
                thursday.push({
                  id:randomUUID(),
                  name:Course.title,
                  startTime:Course.startTime,
                  endTime:Course.endTime,
                  type:'Custom',
                })
                break;

              case 6:
                friday.push({
                  id:randomUUID(),
                  name:Course.title,
                  startTime:Course.startTime,
                  endTime:Course.endTime,
                  type:'Custom',
                })
                break;

            }
          })
          console.log(sunday);
          
        })
      } ,[])
    
    
    return (
        <>
          <TimeTable events={
          {
           "sunday": sunday,
           "monday" : monday,
           "tuesday": tuesday,
           "wednesday":wednesday,
           "thursday":thursday,
           "friday":friday,
          }}
          style={{ 
            position:'absolute',
            bottom:'0',
            height: '500px',
            width:'100%',
             }}
          >

          </TimeTable>
        </>
    );
  };


export default Schedule;