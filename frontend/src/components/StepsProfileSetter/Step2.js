import React, { useState, useEffect } from 'react';
import "./StepsProfileSetter.css"
import Typewriter from '../TypeWriter/TypeWriter';

const Step2 = (props) => {
    const [jobStep2, setJobStep2] = useState("")
    const [id1, setId1] = useState("hidden")
    const [id2, setId2] = useState("hidden")
    const [id3, setId3] = useState("hidden")
    function nextStep() {
        props.setJob(jobStep2)
        props.setStep(3)
    }
    useEffect(() => {
        setTimeout(() => {
            setId1("visible")
            setTimeout(() => {
                setId2("visible")
                setTimeout(() => {
                    setId3("visible")
                }, 600)
            }, 600)
        }, 1000)
    }, [])
    return (
        <div className='stepProfileSetter'>
            <Typewriter className={"textProfileSetter"} delay={30} text={"Hi " + props.name + ", what's your job ?"}></Typewriter>
            <input id={id1} value={jobStep2} onChange={(e) => { setJobStep2(e.target.value) }} className='textInputProfileSetter' type='text' placeholder='Bread maker'></input>
            <div className='navigatorProfileSetter'>
                <button id={id2} className='simpleNavigatorButton' onClick={() => props.setStep(1)}>Previous step</button>
                <button id={id3} className='simpleNavigatorButton' onClick={nextStep}>Next</button>
            </div>
        </div>
    )
};

export default Step2;