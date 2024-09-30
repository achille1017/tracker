import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./Base.css"
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useNavigate } from 'react-router-dom';
import { SERVER_NAME } from '../../config.js';

const Base = (props) => {
    const [loginBoxState, setLoginBoxState] = useState("none")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    function closeLoginBox() {
        setLoginBoxState("none")
    }
    function openLoginBox() {
        setLoginBoxState("loginBox")
    }
    function login() {
        fetch(SERVER_NAME + "/login", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
            },
            body: JSON.stringify({ "username": username, "password": password }) // Convert the JavaScript object to a JSON string
        })
            .then(response => {
                if (response.status === 200) {
                    props.updateLogged().then(
                        () => { navigate('/tracker') }
                    )
                    closeLoginBox()
                }
            })
    }
    function logout() {
        fetch(SERVER_NAME + "/logout", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
            }
        })
            .then(response => {
                if (response.status === 200) {
                    props.updateLogged()
                }
            })
    }
    return (
        <div id='bigBox'>
            <div id='navBar'>
                <div className='leftBoxNavBar' id='linkLeftNavBar'>
                    {props.logged ? <Link to="/tracker" className='linkNavBar'>Tracker</Link> : <Link to="/" className='linkNavBar'>Home</Link>}
                    {props.logged ? <Link to="/profile" className='linkNavBar'>Profile</Link> : <a href="#pricing" className='linkNavBar'>Subscribe</a>}
                </div>
                <p id='productiveToday'>withar.co</p>
                {props.logged ? <div className='rightBoxNavBar'><button id='logout' onClick={logout}>Logout</button> </div> :
                    <div className='rightBoxNavBar'><div id='loginBox1'>
                        <button onClick={openLoginBox} id='getIn'>Get in</button>
                        {loginBoxState !== "none" ? <ClickAwayListener onClickAway={closeLoginBox} touchEvent={false}>
                            <div id='loginBox'>
                                <input onChange={(e) => setUsername(e.target.value)} className='inputLogin' type='text' placeholder='Username'></input>
                                <input onChange={(e) => setPassword(e.target.value)} className='inputLogin' type='password' placeholder='Password'></input>
                                <button onClick={login} id='loginButton'>Login</button>
                                <p id='orP'>or</p>
                                <Link onClick={closeLoginBox} to="/register" id='linkRegister'>Register</Link>
                            </div>
                        </ClickAwayListener> : null}
                    </div></div>
                }
            </div>
            <Outlet></Outlet>
            <div id='footer'>
                <a href='https://achilledorier.com'>Who Am I ?</a>
                <a>Contact</a>
                <p>withar.co 2024</p>
            </div>
        </div>
    );
};

export default Base;
