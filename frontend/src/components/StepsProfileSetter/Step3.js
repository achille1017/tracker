import React, { useState, useEffect } from 'react';
import "./StepsProfileSetter.css"
import Typewriter from '../TypeWriter/TypeWriter';

const Step3 = (props) => {
    const [languageStep3, setLanguageStep3] = useState("english")
    function nextStep(){
        props.setLanguage(languageStep3)
        props.setStep(4)
    }
    return (
        <div className='stepProfileSetter'>
            <Typewriter className={"textProfileSetter"} text={"Which language should I speak to you ?"} delay={30}></Typewriter>
            <select value={languageStep3} onChange={(e)=>setLanguageStep3(e.target.value)} className='selectProfileSetter'>
                <option value="english">English</option>
                <option value="french">Français</option>
                <option value="spanish">Español</option>
            </select>
            <div className='navigatorProfileSetter'>
                <button className='simpleNavigatorButton' onClick={() => props.setStep(2)}>Previous step</button>
                <button className='simpleNavigatorButton' onClick={nextStep}>Next</button>
            </div>
        </div>
    )
};

export default Step3;