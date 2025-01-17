import React, { useEffect, useState } from 'react';
import "./Assistant.css"
import Typewriter from '../TypeWriter/TypeWriter';
import botImg from "../../assets/Arco1.png"
import { SERVER_NAME } from '../../config.js';

const Assistant = (props) => {
    const [advice, setAdvice]= useState("")
    const [link, setLink]= useState("")
    const [textLink, setTextLink]= useState("")

    useEffect(()=>{
        getAdvice()
    },[])
    useEffect(()=>{
        if(advice==="firstAdvice"){
            setAdvice("Ew")
        }
    },[advice])
    function getAdvice() {
        fetch(SERVER_NAME+"/advice", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
            },
            body: JSON.stringify({ "type": "daily"}) // Convert the JavaScript object to a JSON string
        })
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data=>{
                        if(data.advice==="firstAdvice"){
                            setAdvice(`Welcome ${props.name} ! Track your first day full of good habits and get an advice tomorrow. Click on each cell to change its value. Have a good day !`)
                            return
                        }
                        if(data.advice==="noSubscription"){
                            setAdvice("Upgrade plan to get daily advice With Arco AI.")
                            setLink("/subscribe")
                            setTextLink("Subscribe there.")
                            return
                        }
                        setAdvice(data.advice)
                    
                    })
                }
            })
    }
    
    return (
        <div id='assistant'>
            <img id='bot' src={botImg}></img>
            <Typewriter id={"dailyAdivce"} text= {advice} link={link} textLink={textLink} delay={10}/>
        </div>
    );
};

export default Assistant;
