import React, { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./Assistant.css"
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useNavigate } from 'react-router-dom';
import Typewriter from '../TypeWriter/TypeWriter';
import botImg from "../../assets/bot.png"

const Assistant = (props) => {
    const [advice, setAdvice]= useState("")
    useEffect(()=>{
        getAdvice()
    },[])
    function getAdvice() {
        fetch("http://localhost:4000/advice", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
            },
            body: JSON.stringify({ "type": "daily"}) // Convert the JavaScript object to a JSON string
        })
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data=>setAdvice(data.advice))
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
