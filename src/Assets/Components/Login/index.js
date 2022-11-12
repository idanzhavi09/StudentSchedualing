import './index.css';
import onoacademic from '../../images/onoacademic.png';
import {useState} from 'react';
import {useNavigate} from 'react-router-dom'
import React  from 'react';


const Login = () => {


    const navigate = useNavigate();
    const [idNumber, setidNumber] = useState('');
    const [password, setpassword] = useState('');


    const handleSubmit = event => {
    console.log('handleSubmit ran');
    event.preventDefault(); // 👈️ prevent page refresh

    setidNumber('');
    setpassword('');

    if(idNumber==='123456' && password ==='123456'){
        navigate('/Home');
    }

  };
    return(
        <>

        <main>
            <img id='onoLogo' src= {onoacademic} alt="ono" />
            <section className='glass'>
                <h1 className='title'>גריל</h1>
                <h2 className='subtitle'>מערכת לניהול ושיבוץ קורסים</h2>
                <form onSubmit={handleSubmit}>
                <input id='idNumber'onChange={event => setidNumber(event.target.value)}  value={idNumber} name='idNumber' placeholder='תעודת זהות' />
                <input id='password'  onChange={event => setpassword(event.target.value)} value={password} type={'password'} name='password' placeholder= 'סיסמא' />
                <button id='loginButton'  type='Submit'>התחבר</button>
                </form>

            </section>
        </main>
        <div className='circle1'></div>
        <div className='circle2'></div>

        </>
    );
}


export default Login;