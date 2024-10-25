
import React, { useEffect, useState } from 'react';
import "./Usage.css"
import "./Intro.css"
import botImg from "../../assets/Arco1.png"
import { Link, useSearchParams } from 'react-router-dom';


const Intro = (props) => {

    return (
        <div id='introBox'>
            <p className='textUsage'> Our daily habit tracker empowers you to build and maintain positive routines with ease. Here’s how it works: </p>
            <div className='blocIntro'>
                <p className='titleUsage'>1. Choose your habits: Select from three types of daily habits to track</p>
                <div className='sectionIntro'>
                    <p className='textUsage'>Yes/No Habits: Simple binary choices that indicate whether you completed a habit (e.g., waking up at 8 AM).</p>
                    <p className='textUsage'>Numeric Habits: Track quantifiable habits with numerical values (e.g., number of cigarettes smoked per day).</p>
                    <p className='textUsage'>Text-Based Habits: Input your thoughts or observations for habits that require written input (e.g., daily notes or financial reflections).</p>
                </div>


            </div>
            <div className='blocIntro'>
                <p className='titleUsage'>2. Track your daily progress</p>
                <p className='textUsage'>Each day, log your activities and monitor your progress effortlessly. Our intuitive interface allows you to quickly update your habits, ensuring you stay accountable and engaged.</p>
            </div>
            <div className='blocIntro'>
                <p className='titleUsage'>3. With Arco</p>
                <p className='textUsage'>Arco is your personal AI-powered virtual assistant. Each day, Arco analyzes your habit data and provides personalized, actionable advice tailored to help you improve and simplify your daily routines.</p>
            </div>
        </div>
    );
};

export default Intro;
