import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import "./Confirmation.css"
import botImg from "../../assets/Arco1.png"
import { Helmet } from 'react-helmet';


const Confirmation = (props) => {

    return (
        <div id='confirmation'>
            <Helmet>
                <title>With Arco | Get productive today</title>
                <meta name="description" content="With Arco, complete your daily habits with our AI-powered virtual assistant. Get personalized advice and track your progress effortlessly." />
                <meta property="og:title" content="With Arco | Get productive today" />
                <meta property="og:description" content="With Arco, complete your daily habits with our AI-powered virtual assistant. Get personalized advice and track your progress effortlessly." />
                <meta property="og:image" content="https://withar.co/static/media/Arco1.c74a12087a62cf33a280.png" />
            </Helmet>
            <p id='errorText'>Your email is confirmed, you can now login.</p>
            <img id='botError' src={botImg}></img>
            <Link id='getBackHomeError' to="/login">Login</Link>
        </div>
    );
};

export default Confirmation;
