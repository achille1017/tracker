import React, { useState, useEffect } from 'react';
import "./StepsProfileSetter.css"
import Typewriter from '../TypeWriter/TypeWriter';

const Step3 = (props) => {
    const [languageStep3, setLanguageStep3] = useState("english")
    const [id1, setId1] = useState("hidden")
    const [id2, setId2] = useState("hidden")
    const [id3, setId3] = useState("hidden")
    function nextStep() {
        props.setLanguage(languageStep3)
        props.setStep(4)
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
        }, 1400)
    }, [])
    return (
        <div className='stepProfileSetter'>
            <Typewriter className={"textProfileSetter"} text={"Which language should I speak to you ?"} delay={30}></Typewriter>
            <select id={id1} value={languageStep3} onChange={(e) => setLanguageStep3(e.target.value)} className='selectProfileSetter'>
                <option value="english">English</option>
                <option value="french">Français</option>
                <option value="spanish">Español</option>
            </select>
            <div className='navigatorProfileSetter'>
                <button id={id2} className='simpleNavigatorButton' onClick={() => props.setStep(2)}>Previous step</button>
                <button id={id3} className='simpleNavigatorButton' onClick={nextStep}>Next</button>
            </div>
        </div>
    )
};

export default Step3;