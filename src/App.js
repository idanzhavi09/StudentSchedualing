import './App.css';
import { Routes , Route} from 'react-router-dom';
import Login from './Assets/Components/Login';
import Home from './Assets/Components/Home';
import Lecturers from './Assets/Components/Lecturers';
import React  from 'react';
import Courses from './Assets/Components/Courses';
import Assignment from './Assets/Components/Assignment';


function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/Home' element={<Home/>} />
      <Route path='/Lecturers' element={<Lecturers />} />
      <Route path='/Courses' element={<Courses />} />
      <Route path='/Assignment' element={<Assignment />} />
    </Routes>
    </>
  );
}

export default App;
