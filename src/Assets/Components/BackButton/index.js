import './index.css';
import React  from 'react';
import backButtonImg from '../../images/backbutton.png'  ;
import {useNavigate} from 'react-router-dom'


const BackButton = () => {
    const navigate = useNavigate();

    function sendBack(){
        navigate(-1);
    }
    return(
        <>
            <img id='backButtonimg' alt='Back' src={backButtonImg} onClick={sendBack} />
        </>
    );

}

export default BackButton;