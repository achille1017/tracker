import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./Landing.css"
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import screenshot1 from "../../assets/screenshot.png"
import valid from "../../assets/valid.png"


const Landing = (props) => {

    return (
        <div id='landing'>
            <div id='firstBoxLanding'>
                <div id='titleBox'>
                    <p id='title1'>GET</p>
                    <p id='title2'>PRODUCTIVE</p>
                    <p id='title3'>TODAY</p>

                </div>
                <div id='screenshot1Box'><img id='screenshot1' src={screenshot1}></img><p id='legend1'>Get daily habits and track your progress towards success </p></div>
            </div>
            <div id='secondBoxLanding'>
                <p id='text1'>Start tracking your daily habits and improve your productivity. </p>
                <div id="box2Texts">
                    <div className='box2TextsDiv'><p className='box2TextP'>- Get yourself in a constant routine of good practices</p><img className='validImg' src={valid}></img></div>
                    <div className='box2TextsDiv'><p className='box2TextP'>- Follow week after week your progression and be sure to do better</p><img className='validImg' src={valid}></img></div>
                    <div className='box2TextsDiv'><p className='box2TextP'>- Beat bad habits FOREVER</p><img className='validImg' src={valid}></img></div>
                    <div className='box2TextsDiv'><p className='box2TextP'>- No gamification, we're not here to play</p><img className='validImg' src={valid}></img></div>

                </div>
            </div>
            <Link className='getStarted' to="/register">GET STARTED</Link>
            <div id='thirdBoxLanding'>
                <p id='text1'>Why did I build productive.today ? </p>
                <p id='whoMadeItP'>In 2024, I tried to launch with a bad timing a web3 project. Figuring out what my errors were, I quickly observed that my producitvity was the main problem. I was waking up at 11, sleeping at 2 or 3 and working too late.. Once that project I putted a lot of hope into was dead, I had to do something better and I started by working on myself tracking my daily habits to get productive for real. </p>
            </div>
        </div>
    );
};

export default Landing;
