import React, { useState,useEffect } from 'react';
import "./Login.css"
import { SERVER_NAME } from '../../config.js';
import { useNavigateAndScroll } from "../functions.js"

const Login = (props) => {
    const [mail1, setMail1] = useState("")
    const [password, setPassword] = useState("")
    const [mailLogin, setMailLogin] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")
    const [messageState, setMessageState] = useState("none")
    const [errorRegister, setErrorRegister] = useState("")
    const [messageLogin, setMessageLogin] = useState("")
    const [classMessage, setClassMessage] = useState("")

    const goRoute = useNavigateAndScroll()
    useEffect(()=>{window.scrollTo({
        top: 0,
        behavior: 'auto' // Change to 'smooth' for smooth scrolling
      });},[])
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
            })}else{
               
                setErrorRegister("Please enter a valid email address.")
                    setClassMessage("redP")
                    setTimeout(() => { setErrorRegister("") }, 5000)
                
            }
    }
    function isValidEmail(mail) {
        const mailRegex = /^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
        return mailRegex.test(mail);
    }
    function login() {
        fetch(SERVER_NAME + "/login", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
            },
            body: JSON.stringify({ "mail": mailLogin, "password": passwordLogin }) // Convert the JavaScript object to a JSON string
        })
            .then(response => {
                if (response.status === 200) {
                    props.updateLogged().then(
                        () => { goRoute('/tracker') }
                    )
                }
                if (response.status === 401) {
                    response.json().then(data => {
                        setMessageLogin(data.message==="unfound"?"We did not find an account activated with this email address.":data.message==="bad"?"Invalid password":"Something went wrong")

                    })
                }
            })
    }
    return (
        <div id="loginPage">
            <div id='register'>
                <p id='createYour'>Create your account and let's get productive</p>
                <input onChange={(e) => setMail1(e.target.value)} className='inputRegister' type='email'  placeholder='Your email' id="email" pattern=".+@example\.com" ></input>
                <input onChange={(e) => setPassword(e.target.value)} className='inputRegister' type='password' placeholder='Your password' ></input>
                {messageState === "none" ? <button onClick={register} id='registerButton'>Register</button> : <p className={messageState}>A confirmation email has been sent to your registered email address.</p>}
                {errorRegister !== "" && <p className={classMessage}> {errorRegister} </p>}
            </div>
            <div id="verticalLineLogin"></div>
            <div id='login'>
                <p id='createYour'>Log in and track your day now</p>

                <input onChange={(e) => setMailLogin(e.target.value)} className='inputRegister'  type='email' placeholder='Mail' id="email" pattern=".+@example\.com"></input>
                <input onChange={(e) => setPasswordLogin(e.target.value)} className='inputRegister' type='password' placeholder='Password' ></input>
                <button onClick={login} id='registerButton'>Login</button>
                {messageLogin !== "" && <p> {messageLogin} </p>}

            </div>
        </div>
    );
};

export default Login;
