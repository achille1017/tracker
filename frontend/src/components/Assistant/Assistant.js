import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./Assistant.css"
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useNavigate } from 'react-router-dom';
import Typewriter from '../TypeWriter/TypeWriter';
import botImg from "../../assets/bot.png"
import { SERVER_NAME } from '../../config.js';

const Assistant = (props) => {
    const [advice, setAdvice]= useState("")
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
                            setAdvice(`Welcome ${props.name} ! Track your first day full of good habits and get an advice tomorrow. Have a good day !`)
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
            <Typewriter id={"dailyAdivce"} text= {advice} delay={10}/>
        </div>
    );
};

export default Assistant;
