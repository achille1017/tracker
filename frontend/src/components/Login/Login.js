import React, { useState, useEffect } from 'react';
import "./Login.css"
import { SERVER_NAME } from '../../config.js';
import { useNavigateAndScroll } from "../functions.js"
import botImg from "../../assets/Arco1.png"
import Typewriter from '../TypeWriter/TypeWriter.js';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';


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
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    }, [])

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
                        setMessageLogin(data.message === "unfound" ? "We did not find an account activated with this email address." : data.message === "bad" ? "Invalid password" : "Something went wrong")

                    })
                }
            })
    }
    return (
        <div id="loginPage">
            <Helmet>
                <title>With Arco | Login</title>
                <meta name="description" content="With Arco, complete your daily habits with our AI-powered virtual assistant. Get personalized advice and track your progress effortlessly." />
                <meta property="og:title" content="With Arco | Login" />
                <meta property="og:description" content="With Arco, complete your daily habits with our AI-powered virtual assistant. Get personalized advice and track your progress effortlessly." />
                <meta property="og:image" content="https://withar.co/static/media/Arco1.c74a12087a62cf33a280.png" />
            </Helmet>
            <div id='leftBoxLogin1'>
                <div id='leftBoxLogin'>
                    <img id='botLogin' src={botImg}></img>
                    <Typewriter id={"loginAdvice"} text={"Hello ! Good to see you again, ready to track your day ?"} delay={10} />

                </div>
                <p className='linkLogin'>You don't have an account yet ? <Link to="/register">Sign up.</Link></p>

            </div>

            <div id="verticalLineLogin"></div>
            <div id='login'>
                <p id='createYour'>Log in and track your day now</p>
                <input
                    onChange={(e) => setMailLogin(e.target.value)}
                    className='inputRegister'
                    type='email'
                    placeholder='Your email'
                    id="email"
                    name="email"
                    autoComplete="username"
                    required
                />
                <input
                    onChange={(e) => setPasswordLogin(e.target.value)}
                    className='inputRegister'
                    type='password'
                    placeholder='Your password'
                    id="current-password"
                    name="current-password"
                    autoComplete="current-password"
                    required
                />
                <button
                    onClick={login}
                    className='registerButtonColors'
                    id='registerButton'
                    type="submit"
                >
                    Login
                </button>
                {messageLogin !== "" && <p> {messageLogin} </p>}
                <Link className='linkLogin' to="/reset-password">Forgot your password ?</Link>
                <Link className='linkLogin2' to="/reset-password">Forgot your password ?</Link>

            </div>
            <p className='linkLogin2'>You don't have an account yet ? <Link to="/register">Sign up.</Link></p>

        </div>
    );
};

export default Login;
