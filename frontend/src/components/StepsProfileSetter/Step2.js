import React, { useState, useEffect } from 'react';
import "./StepsProfileSetter.css"
import Typewriter from '../TypeWriter/TypeWriter';

const Step2 = (props) => {
    const [jobStep2, setJobStep2] = useState("")
    function nextStep(){
        props.setJob(jobStep2)
        props.setStep(3)
    }
    return (
        <div className='stepProfileSetter'>
            <Typewriter className={"textProfileSetter"} delay={30} text={"Hi " + props.name + ", what's your job ?"}></Typewriter>
            <input value={jobStep2} onChange={(e)=>{setJobStep2(e.target.value)}} className='textInputProfileSetter' type='text' placeholder='Bread maker'></input>
            <div className='navigatorProfileSetter'>
                <button className='simpleNavigatorButton' onClick={() => props.setStep(1)}>Previous step</button>
                <button className='simpleNavigatorButton' onClick={nextStep}>Next</button>
            </div>
        </div>
    )
};

export default Step2;