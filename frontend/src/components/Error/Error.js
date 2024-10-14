import React, { useEffect, useState } from 'react';
import "./Error.css"
import botImg from "../../assets/Arco1.png"
import { Link } from 'react-router-dom';

const Error = (props) => {


    return (
        <div id='errorBox'>
            <p id='errorText'>Nothing here...</p>
            <img id='botError' src={botImg}></img>
            <Link id='getBackHomeError' to="/">Get back home</Link>
        </div>
    );
};

export default Error;
