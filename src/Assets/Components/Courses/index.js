import onoacademic from '../../images/onoacademic.png';
import React  from 'react';
// import { useState , Component} from 'react';
import Calendar from 'react-calendar';

require('./index.css');

// const [value, onChange] = useState(new Date());


const Courses = () => {
    return(
        <>
            <main>
                <img id='onoLogo' src={onoacademic} alt="ono" />
                <section className='glass'>
                    <h1 className='title'>מסך קורסים</h1>
                    {/* <Calendar onChange={onChange} value={value}/> */}
                </section>
            </main>
            <div className='circle1'></div>
            <div className='circle2'></div>
        </>
    )
}

export default Courses;