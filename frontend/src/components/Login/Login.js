import React, { useState,useEffect } from 'react';
import "./Login.css"
import { SERVER_NAME } from '../../config.js';
import { useNavigateAndScroll } from "../functions.js"

const Login = (props) => {
    const [mail1, setMail1] = useState("")
    const [mail2, setMail2] = useState("")
    const [password, setPassword] = useState("")
    const [mailLogin, setMailLogin] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")
    const [messageState, setMessageState] = useState("none")
    const [errorRegister, setErrorRegister] = useState("")
    const goRoute = useNavigateAndScroll()
    useEffect(()=>{window.scrollTo({
        top: 0,
        behavior: 'auto' // Change to 'smooth' for smooth scrolling
      });},[])
    function register() {
        if (mail1 !== mail2) {
            setErrorRegister("Mail addresses don't match")
            setTimeout(() => { setErrorRegister("") }, 4000)
            return
        }
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
            })
    }
    return (
        <div id="loginPage">
            <div id='register'>
                <p id='createYour'>Create your account and let's get productive</p>
                <input onChange={(e) => setMail1(e.target.value)} className='inputRegister' type='text' placeholder='Your mail'></input>
                <input onChange={(e) => setMail2(e.target.value)} className='inputRegister' type='text' placeholder='Confirm your mail'></input>
                <input onChange={(e) => setPassword(e.target.value)} className='inputRegister' type='password' placeholder='Your password'></input>
                {messageState === "none" ? <button onClick={register} id='registerButton'>Register</button> : <p className={messageState}>Your account has been created, you can now log in.</p>}
                {errorRegister !== "" && <p> {errorRegister} </p>}
            </div>
            <div id="verticalLineLogin"></div>
            <div id='login'>
                <p id='createYour'>Log in and track your day now</p>

                <input onChange={(e) => setMailLogin(e.target.value)} className='inputRegister' type='text' placeholder='Mail'></input>
                <input onChange={(e) => setPasswordLogin(e.target.value)} className='inputRegister' type='password' placeholder='Password'></input>
                <button onClick={login} id='registerButton'>Login</button>
            </div>
        </div>
    );
};

export default Login;
