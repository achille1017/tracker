import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "./Register.css"
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

const Register = (props) => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [messageState, setMessageState] = useState("none")
    const navigate = useNavigate()
    function register() {
        fetch("http://localhost:4000/register", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
            },
            body: JSON.stringify({ "username": username, "password": password }) // Convert the JavaScript object to a JSON string
        })
            .then(response => {
                if (response.status === 200) {
                    setMessageState('')
                }
            })
    }
    return (
        <div id='register'>
            <p id='createYour'>Create your account and let's get productive !</p>
            <input onChange={(e) => setUsername(e.target.value)} className='inputRegister' type='text' placeholder='Your username'></input>
            <input onChange={(e) => setPassword(e.target.value)} className='inputRegister' type='password' placeholder='Your password'></input>
            {messageState==="none"?<button onClick={register} id='registerButton'>Register</button>:            <p className={messageState}>Your account has been created, you can now log in.</p>}

        </div>
    );
};

export default Register;
