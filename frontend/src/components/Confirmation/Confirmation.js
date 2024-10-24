import React, { useState, useEffect } from 'react';
import { Link, } from 'react-router-dom';
import "./Confirmation.css"
import botImg from "../../assets/Arco1.png"


const Confirmation = (props) => {

    return (
        <div id='confirmation'>
            <p id='errorText'>Your email is confirmed, you can now login.</p>
            <img id='botError' src={botImg}></img>
            <Link id='getBackHomeError' to="/login">Login</Link>
        </div>
    );
};

export default Confirmation;
