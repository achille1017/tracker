import React, { useState, useEffect } from 'react';
import "./StepsProfileSetter.css"
import Typewriter from '../TypeWriter/TypeWriter';

const Step1 = (props) => {
    const [nameStep1, setNameStep1] = useState("")
    function nextStep(){
        props.setName(nameStep1)
        props.setStep(2)
    }
    return (
        <div className='stepProfileSetter'>
            <Typewriter className={"textProfileSetter"} text={"What's your name ?"} delay={30}></Typewriter>
            <input className='textInputProfileSetter' value={nameStep1} onChange={(e)=>{setNameStep1(e.target.value)}}  type='text' placeholder='Bob'></input>
            <button className='simpleNavigatorButton' id='alignSelfEnd' onClick={nextStep}>Next</button>
        </div>
    )
};

export default Step1;