import React, { useState, useEffect } from 'react';
import "./StepsProfileSetter.css"
import Typewriter from '../TypeWriter/TypeWriter';

const Step1 = (props) => {
    const [nameStep1, setNameStep1] = useState("")
    const [id1, setId1] = useState("hidden")
    const [id2, setId2] = useState("hidden")
    function nextStep() {
        props.setName(nameStep1)
        props.setStep(2)
    }
    useEffect(() => {
        setTimeout(() => {
            setId1("visible")
            setTimeout(() => {
                setId2("visible")
            }, 600)
        }, 800)
    }, [])
    return (
        <div className='stepProfileSetter'>
            <Typewriter className={"textProfileSetter"} text={"What's your name ?"} delay={30}></Typewriter>
            <input id={id1} className='textInputProfileSetter' value={nameStep1} onChange={(e) => { setNameStep1(e.target.value) }} type='text' placeholder='Bob'></input>
            <button id={id2} className='simpleNavigatorButton alignSelfEnd' onClick={nextStep}>Next</button>
        </div>
    )
};

export default Step1;