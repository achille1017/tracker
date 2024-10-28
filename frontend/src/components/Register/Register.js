import React, { useState, useEffect } from 'react';
import "./Register.css"
import { SERVER_NAME } from '../../config.js';
import { useNavigateAndScroll } from "../functions.js"
import botImg from "../../assets/Arco1.png"
import Typewriter from '../TypeWriter/TypeWriter.js';
import { Link } from 'react-router-dom';
const Register = (props) => {
    const [mail1, setMail1] = useState("")
    const [password, setPassword] = useState("")
    const [mailLogin, setMailLogin] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")
    const [messageState, setMessageState] = useState("none")
    const [errorRegister, setErrorRegister] = useState("")
    const [messageLogin, setMessageLogin] = useState("")
    const [classMessage, setClassMessage] = useState("")

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto' // Change to 'smooth' for smooth scrolling
        });
    }, [])
    function register() {
        if (isValidEmail(mail1)) {
            fetch(SERVER_NAME + "/register", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json', // Indicate that you're sending JSON
                },
                body: JSON.stringify({ "mail": mail1, "password": password }) // Convert the JavaScript object to a JSON string
            })
                .then(response => {
                    if (response.status === 200) {
                        setMessageState('')
                    }
                })
        } else {

            setErrorRegister("Please enter a valid email address.")
            setClassMessage("redP")
            setTimeout(() => { setErrorRegister("") }, 5000)

        }
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
                    <Typewriter id={"loginAdvice"} text={"Hi, I'm Arco. Your virtual assistant powered by AI. Ready to get productive ?"} delay={10} />
                </div>
                <p className='linkLogin'>You already have an account ? <Link to="/login">Login</Link></p>
            </div>
            <div id="verticalLineLogin"></div>
            <div id='login'>
                <p id='createYour'>Create your account and let's get productive</p>
                <input onChange={(e) => setMail1(e.target.value)} className='inputRegister' type='email' placeholder='Your email' id="email" pattern=".+@example\.com" ></input>
                <input onChange={(e) => setPassword(e.target.value)} className='inputRegister' type='password' placeholder='Your password' ></input>
                {messageState === "none" ? <button onClick={register} id='registerButton' className='registerButtonColors'>Register</button> : <p className={messageState}>A confirmation email has been sent to your registered email address.</p>}
                {errorRegister !== "" && <p className={classMessage}> {errorRegister} </p>}
                
            </div>
            <p className='linkLogin2'>You already have an account ? <Link to="/login">Login</Link></p>

        </div>
    );
};

export default Register;
