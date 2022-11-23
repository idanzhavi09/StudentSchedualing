import './index.css'
import React  from 'react';
import { useState , useRef } from 'react';
import onoacademic from '../../images/onoacademic.png';
import { DragDropContext , Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'uuid/dist/v4';
import Scheduler from 'react-weekly-table';
const axios = require('axios').default;




const Courses =[
  {
    courseName:'תקשורת ונתונים',
    id:uuid(),
  },
  {
    courseName:'מבוא למדמח',
    id:uuid(),
  },
  {
    courseName:'חדשנות ויצירתיות',
    id:uuid(),
  },
  {
    courseName:"סייבר ואבטחת מידע",
    id:uuid(),
  }
]

const columnsFromBackend = 
  {
    [uuid()]: {
      name:'קורסים',
      items:Courses,
    },
    [uuid()]: {
      name:'ראשון',
      items:[],
    },
    [uuid()]: {
      name:'שני',
      items:[]
    },
    [uuid()]:{
      name:'שלישי',
      items:[]
    }
    ,
    [uuid()]:{
      name:'רביעי',
      items:[]
    }
    ,
    [uuid()]:{
      name:'חמישי',
      items:[]
    }
    ,
    [uuid()]:{
      name:'שישי',
      items:[]
    }
  };

  const onDragEnd = (result , columns , setColumns) => {
    if(!result.destination) return;
    
    const {source , destination} = result;

    if(source.droppableId !== destination.droppableId){
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index , 1);
      destItems.splice(destination.index , 0 , removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items:sourceItems
        },
        [destination.droppableId]: {
          ...destColumn,
          items:destItems
        }
      })
    }
    else{
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const[removed] = copiedItems.splice(source.index , 1);
      copiedItems.splice(destination.index , 0 , removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items:copiedItems
        }
      })
    }

  }


    // axios({
    //     method:'GET',
    //     url:'/getCourses'
    // }).then((response) => console.log(response));
const handleSubmitCourse = () => {
  console.log('New Submission');
}

const Assignment = () => {

  const [items , updateItems] = useState(Courses);
  const [columns , setColumns] = useState(columnsFromBackend);
        return(
            <>
            <main>
                <img id='onoLogo' src={onoacademic} alt="ono" />
                <section className='glass'>
                    <h1 className='title'>מסך שיבוצים</h1>
                    <br />
                      <DragDropContext onDragEnd={result => onDragEnd(result , columns , setColumns)}>
                        {Object.entries(columns).map(([id , column]) => {
                          return(
                            <div style={{display:'flex' , flexDirection:'column' , alignItems:'center'}}>
                              <h2>{column.name}</h2>
                              <div style={{margin:8}}>
                            <Droppable droppableId={id} key={id}>
                              {(provided , snapshot) => {
                                return(
                                  <div 
                                  {...provided.droppableProps}
                                   ref={provided.innerRef}
                                    style={{background: snapshot.isDraggingOver ? 'lightblue' : 'lightgrey' ,
                                     padding:4,
                                     width:100,
                                     minHeight:500,
                                     }}>
                                      {column.items.map((item , index) => {
                                        return(
                                          <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided , snapshot) => {
                                              return(
                                              <div
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              style={{
                                                userSelect:'none',
                                                padding:16,
                                                margin: '10px 0 8px 0',
                                                minHeight:'25px',
                                                maxHeight:'25px',
                                                backgroundColor: snapshot.isDragging ? '#66c79a' : '#7ceca2',
                                                color:'white',
                                                ...provided.draggableProps.style
                                              }}
                                              >
                                                {item.courseName}
                                              </div>
                                              )
                                              
                                            }}
                                          </Draggable>
                                        )
                                      })}
                                      {provided.placeholder}
                                  </div>
                                )
                              }}
                            </Droppable>
                            </div>
                            </div>
                          );
                        })}
                      </DragDropContext>
                
                </section>
            </main>
            <div className='circle1'></div>
            <div className='circle2'></div>
            </>
        );
}

export default Assignment;