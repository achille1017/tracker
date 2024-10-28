import React, { useState, useEffect } from 'react';
import "./StepsProfileSetter.css"
import Typewriter from '../TypeWriter/TypeWriter';

const Step2Bis = (props) => {
    const [objectivesStep2Bis, setObjectivesStep2Bis] = useState("")
    const [id1, setId1] = useState("hidden")
    const [id2, setId2] = useState("hidden")
    const [id3, setId3] = useState("hidden")
    function nextStep() {
        props.setObjectives(objectivesStep2Bis)
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
            <Typewriter className={"textProfileSetter"} delay={30} text={"Tell me about your objectives..."}></Typewriter>
            <textarea id={id1} value={objectivesStep2Bis} onChange={(e) => { setObjectivesStep2Bis(e.target.value) }} className='textareaProfileSetter' placeholder='I want to...'></textarea>
            <div className='navigatorProfileSetter'>
                <button id={id2} className='simpleNavigatorButton' onClick={() => props.setStep(2)}>Previous step</button>
                <button id={id3} className='simpleNavigatorButton' onClick={nextStep}>Next</button>
            </div>
        </div>
    )
};

export default Step2Bis;