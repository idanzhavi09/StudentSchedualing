import './index.css'
import React  from 'react';
import { useState } from 'react';
import onoacademic from '../../images/onoacademic.png';
import { DragDropContext , Droppable, Draggable } from 'react-beautiful-dnd';
import uuid from 'uuid/dist/v4';
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
      name:'Sunday',
      items:Courses,
    },
    [uuid()]: {
      name:'Monday',
      items:[]
    }
  };

  const onDragEnd = (result , columns , setColumns) => {
    if(!result.destination) return;
    
    const {source , destination} = result;
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
const Assignment = () => {

    // axios({
    //     method:'GET',
    //     url:'/getCourses'
    // }).then((response) => console.log(response));

    const [items , updateItems] = useState(Courses);
    const [columns , setColumns] = useState(columnsFromBackend);

        return(
            <>
            <main>
                <img id='onoLogo' src={onoacademic} alt="ono" />
                <section className='glass'>
                    <h1 className='title'>מסך שיבוצים</h1>
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
                                     width:250,
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
                                                margin: '0 0 8px 0',
                                                minHeight:'50px',
                                                backgroundColor: snapshot.isDragging ? '#263B4A' : '#456C86',
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