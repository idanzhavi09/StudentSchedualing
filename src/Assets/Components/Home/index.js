import './index.css';
import onoacademic from '../../images/onoacademic.png';
import {useNavigate} from 'react-router-dom'
import React  from 'react';


const Home = () => {
    const navigate = useNavigate();

    function sendToCourses() {
        navigate('/Courses');
    }

    function sendToLecturers() {
        navigate('/Lecturers');
    }

    function sendToAssignment() {
        navigate('/Assignment');
    }
    return(
        <>  
        <main>
            <img id='onoLogo' src={onoacademic} alt="ono" />
            <section className='glass'>
                <h1 className='title'>מסך בית</h1>

                <button onClick={sendToCourses} className = "buttons" id='btnCourses'>קורסים</button>
                <button onClick={sendToLecturers} className = "buttons" id='btnProf'>מרצים</button>
                <button onClick={sendToAssignment} className = "buttons" id='btnAssign'>שיבוצים</button>


            </section>
        </main>
        <div className='circle1'></div>
        <div className='circle2'></div>
        </>


    );
}

export default Home;