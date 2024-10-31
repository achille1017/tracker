import React, { useState, useEffect } from 'react';
import "./PasswordForgotten.css"
import { SERVER_NAME } from '../../config.js';
import { useNavigateAndScroll } from "../functions.js"
import botImg from "../../assets/Arco1.png"
import Typewriter from '../TypeWriter/TypeWriter.js';
import { Link, useSearchParams } from 'react-router-dom';



const PasswordForgotten = (props) => {
    const [searchParams] = useSearchParams();

    const [mail, setMail] = useState("")
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")

    const [messageState, setMessageState] = useState("none")
    const [errorRegister, setErrorRegister] = useState("")
    const [messageLogin, setMessageLogin] = useState("")
    const [classMessage, setClassMessage] = useState("")
    const [mode, setMode] = useState(0)
    const [stateRegister, setStateRegister] = useState(0)

    const goRoute = useNavigateAndScroll()
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto' // Change to 'smooth' for smooth scrolling
        });

        setMode(searchParams.get("token") !== null ? 2 : 1)
    }, [])
    function sendLink() {
        setStateRegister(1)
        fetch(SERVER_NAME + "/api/forgot-password", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
            },
            body: JSON.stringify({ "mail": mail }) // Convert the JavaScript object to a JSON string
        })
            .then(response => {
                if (response.status === 200) {
                    setStateRegister(2)
                }
                if (response.status === 401) {

                }
            })
    }
    function chooseNewPassword() {
        if(password1!==password2){
            setMessageLogin("Passwords are differents.")
            return
        }

        setStateRegister(1)

        fetch(SERVER_NAME + "/api/reset-password", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
            },
            body: JSON.stringify({ "password": password1,"token":searchParams.get("token") }) // Convert the JavaScript object to a JSON string
        })
            .then(response => {
                if (response.status === 200) {
                    setStateRegister(2)
                }
                if (response.status === 401) {

                }
            })
    }
    function isValidEmail(mail) {
        const mailRegex = /^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
        return mailRegex.test(mail);
    }

    return (
        <div id="loginPage">
            <div id='leftBoxLogin1'>
                <div id='leftBoxLogin'>
                    <img id='botLogin' src={botImg}></img>
                    <Typewriter id={"loginAdvice"} text={mode === 1 ? "Hello ! You forgot your password ? Let's reset it." : mode === 2 ? "Let's choose a new strog password." : ""} delay={10} />

                </div>
                {mode === 1 && <p className='linkLogin'>You don't have an account yet ? <Link to="/register">Sign up.</Link></p>}

            </div>

            <div id="verticalLineLogin"></div>
            <div id='login'>
                <p id='createYour'>{mode === 1 ? "Reset your password" : "Choose a new password"}</p>
                {mode === 1 ? <input onChange={(e) => setMail(e.target.value)} className='inputRegister' type='email' placeholder='Your email' id="email" pattern=".+@example\.com" value={mail}></input> :
                    <><input onChange={(e) => setPassword1(e.target.value)} className='inputRegister' type='password' placeholder='Your new password' value={password1}></input>
                        <input onChange={(e) => setPassword2(e.target.value)} className='inputRegister' type='password' placeholder='Confirm your new password' value={password2}></input>
                    </>}

                {stateRegister===0?<
                    button onClick={mode===1?sendLink:chooseNewPassword} id='registerButton'>{mode===1?"Send me a link":"Set new password"}</button>
                    :stateRegister===2? mode===1?<p>A password reset link has been sent to your email address.</p>:<p>Password updated, you can now <Link to="/login">login</Link></p>
                    :<div id="registerLoader" className='loader'></div>}
                {messageLogin !== "" && <p> {messageLogin} </p>}

            </div>
            <p className='linkLogin2'>You don't have an account yet ? <Link to="/register">Sign up.</Link></p>
        </div>
    );
};

export default PasswordForgotten;
