import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "./Base.css"
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useLocation } from 'react-router-dom';
import { SERVER_NAME } from '../../config.js';
import { useNavigateAndScroll } from "../functions.js"
const Base = (props) => {
    const [loginBoxState, setLoginBoxState] = useState("none")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [loaded, setLoaded] = useState(false)
    const location = useLocation();
    const goRoute = useNavigateAndScroll()
    const navigate = useNavigate();

    useEffect(() => {
        if (props.logged) {
            props.updatePlan().then((plan) => {
                redirect(plan)
                setLoaded(true)
            })
        }
    }, [props.logged])
    useEffect(() => {
        if (loaded) {
            redirect(props.plan)
        }
    }, [location])
    function redirect(plan) {
        if (props.logged && plan.status === "inactive" && location.pathname !== "/subscribe" && location.pathname !== "/" && location.pathname !== "/payement") {
            goRoute('/subscribe')
        }
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
                    goRoute('/')
                }
            })
    }
    return (
        <div id='bigBox'>
            <div id='navBar'>
                {
                    props.logged ? loaded ?
                        <div className='leftBoxNavBar' id='linkLeftNavBar'>
                            {props.plan.status === "active" ? <Link to="/tracker" className='linkNavBar'>Tracker</Link> : <button className='linkNavBar' onClick={() => goRoute('/')}>Home</button>}
                            {props.plan.status === "active" ? <Link to="/profile" className='linkNavBar'>Profile</Link> : <button className='linkNavBar' onClick={() => goRoute('/subscribe')}>Subscribe</button>}
                            <a href="mailto:contact@withar.co" className='linkNavBar'>Contact</a>
                        </div> : null :
                        <div className='leftBoxNavBar' id='linkLeftNavBar'>
                            <button className='linkNavBar' onClick={() => goRoute('/')}>Home</button>
                            <button className='linkNavBar' onClick={() => {navigate('/#pricing')}}>Whitelist</button>
                            <a href="mailto:contact@withar.co" className='linkNavBar'>Contact</a>
                        </div>
                }
                <p id='withArco' onClick={() => goRoute('/')}>With Arco</p>
                {/*props.logged ? <div className='rightBoxNavBar'><button id='logout' onClick={logout}>Logout</button> </div> :
                    <div className='rightBoxNavBar'>
                        <div id='loginBox1'>
                            <button onClick={() => { goRoute('/login') }} id='getIn'>Get in</button>
                        </div>
                    </div>
              */  }
                <div className='rightBoxNavBar'></div>
            </div>
            <Outlet></Outlet>
            <div id='footer'>
                <a className="footerText" href='https://achilledorier.com' target="_blank"
                    rel="noopener noreferrer">Who Am I ?</a>
                <a className="footerText" href='mailto:contact@withar.co' target="_blank"
                    rel="noopener noreferrer">Contact</a>
                <p className="footerText">withar.co 2024</p>
            </div>
        </div>
    );
};

export default Base;
