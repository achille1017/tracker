import React, { useEffect, useState } from 'react';
import "./ProfileSetter.css"
import Step1 from '../StepsProfileSetter/Step1';
import Step2 from '../StepsProfileSetter/Step2';
import Step2Bis from '../StepsProfileSetter/Step2Bis';

import Step3 from '../StepsProfileSetter/Step3';
import Step4 from '../StepsProfileSetter/Step4';
import { SERVER_NAME } from '../../config.js';
import { useNavigateAndScroll } from "../functions.js"



const ProfileSetter = (props) => {
    const [step, setStep] = useState(0)
    const [name, setName] = useState("")
    const [job, setJob] = useState("")
    const [plan, setPlan] = useState()
    const [objectives,setObjectives] = useState("")
    const goRoute = useNavigateAndScroll()

    const [language, setLanguage] = useState("english")
    function setProfile() {
        const profile = { "profileSet": 1, "name": name, "job": job, "language": language,"objectives":objectives }
        fetch(SERVER_NAME + "/setprofile", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
            },
            body: JSON.stringify({ "newProfile": profile }),
            credentials: 'include'
        })
            .then(response => {
                if (response.status === 200) {

                    props.updateHabits()
                    props.updateProfile()
                    props.updateData()
                }
            })
    }
    useEffect(() => {
        if (plan !== undefined) {
            if (plan.status === "inactive") {
                goRoute('/subscribe')
            }
        }
    }, [plan])

    useEffect(() => {

        setStep(1)


    }, [])
    return (
        <div id='profileSetter'>
            {step === 0 ? null : step === 1 ? <Step1 setStep={setStep} setName={setName}></Step1> : step === 2 ? <Step2 setJob={setJob} name={name} setStep={setStep}></Step2> :step === "2bis" ? <Step2Bis setObjectives={setObjectives}  setStep={setStep}></Step2Bis> : step === 3 ? <Step3 setLanguage={setLanguage} setStep={setStep}></Step3> : step === 4 ? <Step4 setStep={setStep} updateData={props.updateData} setProfile={setProfile}></Step4> : null}
        </div>
    );
};

export default ProfileSetter;
