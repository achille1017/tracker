
import React, { useEffect, useState } from 'react';
import "./Usage.css"
import "./TrackDocs.css"

import botImg from "../../assets/Arco1.png"
import { Link, useSearchParams } from 'react-router-dom';

const Arco = (props) => {

    return (
        <div id='boxUsageArco'>
            <div id='arcoDocs'>

                <p className='titleTrackDocs'>Optimizing AI Understanding: How to Provide Clear Information for Your Virtual Assistant</p>
                <p className='textTrackDocs'>When using an AI virtual assistant to track and analyze your daily habits, providing clear and comprehensive information is crucial for optimal performance. By helping the AI understand you better, you'll receive more accurate insights and personalized recommendations. Here's how to effectively communicate key information to your virtual assistant:</p>
                <p className='textTrackDocs'>Name: Provide your full name or preferred name. For example, "My name is Alex Johnson" or "I go by AJ."</p>
                <p className='textTrackDocs'>Job Title and Industry: Be specific. Instead of just saying "I work in tech," say "I'm a Senior Software Developer in the fintech industry."</p>
                <p className='textTrackDocs'>Short-term Goals: State immediate objectives. "I want to establish a consistent morning routine within the next month."</p>
                <p className='textTrackDocs'>Long-term Goals: Explain broader aspirations. "My goal is to transition into a management role within two years while maintaining a healthy work-life balance."</p>
                <p className='textTrackDocs'>Health and Fitness Goals: Be specific about targets. "I aim to run a half-marathon in 6 months and reduce my body fat percentage by 5%."</p>
            </div>
            <img id='arcoDocsImg' src={botImg}></img>

        </div>
    );
};

export default Arco;
