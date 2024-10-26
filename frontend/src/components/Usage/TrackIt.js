
import React, { useEffect, useState } from 'react';
import "./Usage.css"
import "./Intro.css"
import botImg from "../../assets/Arco1.png"
import { Link, useSearchParams } from 'react-router-dom';


const TrackIt = (props) => {

    return (
        <div id='introBox'>
            <p className='textUsageMid'> The Importance of Daily Habit Tracking for Productivity and Success </p>
            <p className='textUsage'> Tracking your habits every day is a powerful tool for enhancing productivity and achieving success. Here’s why it matters: </p>
            <div className='blocIntro'>
                <p className='titleUsage'>1. Increased Awareness</p>
                    <p className='textUsage'>Daily habit tracking helps you become more aware of your routines and behaviors. By logging your activities, you can identify patterns, recognize what works for you, and pinpoint areas that need improvement.</p>
            </div>
            <div className='blocIntro'>
                <p className='titleUsage'>2. Accountability</p>
                <p className='textUsage'>When you track your habits consistently, you create a sense of accountability. This commitment to yourself encourages you to stay on course and make better choices aligned with your goals.</p>
            </div>
            <div className='blocIntro'>
                <p className='titleUsage'>3. Motivation and Progress</p>
                <p className='textUsage'>Seeing your progress over time can be incredibly motivating. Daily tracking provides tangible evidence of your efforts, helping you celebrate small wins and stay inspired to keep pushing forward.</p>
            </div>
            <div className='blocIntro'>
                <p className='titleUsage'>4. Building Resilience</p>
                <p className='textUsage'>Tracking habits fosters resilience by helping you learn from setbacks. If you miss a day or fall short of a goal, analyzing the reasons behind it can provide valuable insights for future improvement.</p>
            </div>
            <div className='blocIntro'>
                <p className='titleUsage'>5. Enhanced Well-being</p>
                <p className='textUsage'>Many productive habits also contribute to overall well-being—like exercise, mindfulness, and proper sleep. By tracking these habits, you not only boost productivity but also improve your mental and physical health.</p>
            </div>
        </div>
    );
};

export default TrackIt;
