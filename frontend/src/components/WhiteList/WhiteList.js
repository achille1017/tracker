import React, { useEffect, useState } from 'react';
import "./WhiteList.css"
import Typewriter from '../TypeWriter/TypeWriter';
import botImg from "../../assets/Arco1.png"
import { SERVER_NAME } from '../../config.js';

const WhiteList = (props) => {
    const [mail, setMail] = useState("")
    const [message, setMessage] = useState("")
    const [classMessage, setClassMessage] = useState("")

    function addToWhiteList() {
        fetch(SERVER_NAME + "/whitelist", {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
            },
            body: JSON.stringify({ "mail": mail }) // Convert the JavaScript object to a JSON string
        })
            .then(response => {
                console.log(response.status)
                console.log(response.status === 200)
                console.log(response.status === 304)
                console.log(response.status === 400)

                if (response.status === 200) {
                    setMessage("You have been successfully added to the whitelist !")
                    setClassMessage("greenP")
                }
                else if (response.status === 304) {
                    setMessage("You were already into the whitelist !")
                    setClassMessage("greenP")
                }
                else {
                    setMessage("Something went wrong...")
                    setClassMessage("redP")
                }
            })
    }
    function isValidEmail(email) {
        // Regular expression for email validation
        const emailRegex = /^[a-zA-Z0-9_-]+(?:\.[a-zA-Z0-9_-]+)*@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*\.[a-zA-Z]{2,}$/;
        // Test the email against the regex
        return emailRegex.test(email);
    }
    function checkEmail(mail) {
        if (isValidEmail(mail)) {
            addToWhiteList()
        }
        else {
            setMessage("Please enter a valid email address.")
            setClassMessage("redP")
            setTimeout(() => { setMessage("") }, 5000)
        }
    }
    return (
        <div id='whiteList'>
            <p id='whiteListText1'>WHITELIST</p>
            <p id='whiteListText2'>Register now to the whitelist to get exclusive free beta access.</p>
            <input id='email' className='inputRegister inputWhiteList' type="email" value={mail} onChange={(e) => { setMail(e.target.value) }} pattern=".+@example\.com" />
            <button id='registerButton' className='inputWhiteList2' onClick={() => { checkEmail(mail) }}>Register to whitelist</button>
            <p id='messageWhiteList' className={classMessage}>{message}</p>
        </div>
    );
};

export default WhiteList;
