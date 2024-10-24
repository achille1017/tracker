import React, { useEffect, useState } from 'react';
import "./Error.css"
import botImg from "../../assets/Arco1.png"
import { Link, useSearchParams } from 'react-router-dom';

const Error = (props) => {
    const [searchParams] = useSearchParams();
    const [message, setMessage] = useState("")
    useEffect(() => {
        console.log(searchParams.get("code"))
        setMessage(searchParams.get("code") === null || searchParams.get("code") === undefined ? "Nothing here..." :
            searchParams.get("code") == 401 ? "Email verification failed. The link may be invalid or expired." :
                searchParams.get("code") == 500 ? "Something went wrong from our side.. sorry for the inconvenience." :
                    "Something went wrong.")
    }, [])
    return (
        <div id='errorBox'>
            <p id='errorText'>{message}</p>
            <img id='botError' src={botImg}></img>
            <Link id='getBackHomeError' to="/">Get back home</Link>
        </div>
    );
};

export default Error;
