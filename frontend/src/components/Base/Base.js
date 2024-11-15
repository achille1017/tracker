import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import "./Base.css"
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useLocation } from 'react-router-dom';
import { SERVER_NAME } from '../../config.js';
import { useNavigateAndScroll } from "../functions.js"
import hamburger from "../../assets/hamburger.png"

const Base = (props) => {
    const [loginBoxState, setLoginBoxState] = useState("none")
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")
    const [loaded, setLoaded] = useState(false)
    const [menuMobile, setMenuMobile] = useState("linksBarMobile")
    const location = useLocation();
    const preGoRoute = useNavigateAndScroll()
    const goRoute = (route) => {
        setMenuMobile("linksBarMobile")
        props.setScrollDocument('').then(() => preGoRoute(route)
        )
    }
    const navigate = useNavigate();


    function toggleMenu() {
        setMenuMobile(menuMobile === "linksBarMobile" ? "linksBarMobileActive" : "linksBarMobile")
        props.setScrollDocument(menuMobile === "linksBarMobile" ? 'hidden' : '')
    }
    useEffect(() => {
        if (props.logged) {
            props.updatePlan().then((plan) => {
                redirect(plan)
                setLoaded(true)
                if (plan) {
                    props.updateProfile()
                }
            })
        }
    }, [props.logged])
    function redirect(plan) {
        if (!plan && location.pathname !== "/subscribe" && location.pathname !== "/payement") {
            goRoute('/subscribe')
        }
        else {
            props.updateProfile().then((profile) => {
                if (profile.profileSet === 0 && location.pathname === "/profile") {
                    goRoute('/tracker')
                }
            })
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
            <nav id='navBar'>
                {
                    props.logged ? loaded ?
                        <div className='leftBoxNavBar' id='linkLeftNavBar'>
                            {props.plan ? <Link to="/tracker" className='linkNavBar'>Tracker</Link> : <button className='linkNavBar' onClick={() => goRoute('/')}>Home</button>}
                            {props.plan ? props.profile.profileSet === 0 ? null : <Link to="/profile" className='linkNavBar'>Profile</Link> : <button className='linkNavBar' onClick={() => goRoute('/subscribe')}>Subscribe</button>}
                            <button className='linkNavBar' onClick={() => { goRoute('/docs/intro') }}>Usage</button>
                            <button className='linkNavBar' onClick={() => { goRoute('/blog') }}>Blog</button>

                        </div> : null :
                        <div className='leftBoxNavBar' id='linkLeftNavBar'>
                            <button className='linkNavBar' onClick={() => goRoute('/')}>Home</button>
                            <button className='linkNavBar' onClick={() => { navigate('/#pricing') }}>Subscribe</button>
                            <button className='linkNavBar' onClick={() => { goRoute('/docs/intro') }}>Usage</button>
                            <button className='linkNavBar' onClick={() => { goRoute('/blog') }}>Blog</button>

                        </div>
                }
                <p id='withArco' onClick={() => goRoute('/')}>With Arco</p>


                {props.logged ? <div className='rightBoxNavBar'><button id='logout' onClick={logout}>Logout</button> </div> :
                    <div className='rightBoxNavBar'>
                        <div id='loginBox1'>
                            <button onClick={() => { goRoute('/login') }} id='getIn'>Login</button>

                            <button onClick={() => { goRoute('/register') }} id='getIn' className='registerButtonColors'>Sign up</button>
                        </div>
                    </div>
                }
                <button onClick={toggleMenu} id='hamburger'><img src={hamburger} id='hamburgerImg'></img></button>
                {!props.logged ? <button onClick={() => { goRoute('/login') }} className='getInMobile'>Login</button> : <p id='withArcoMobile' onClick={() => goRoute('/')}>With Arco</p>}

                {menuMobile === "linksBarMobileActive" &&
                    <ClickAwayListener onClickAway={toggleMenu} touchEvent={false}>
                        <div id={menuMobile}>
                            {
                                props.logged ? loaded ?
                                    <>
                                        {props.plan ? <button className='linkNavBar' onClick={() => goRoute('/tracker')}>Tracker</button> : <button className='linkNavBar' onClick={() => goRoute('/')}>Home</button>}
                                        {props.plan ? props.profile.profileSet === 0 ? null : <button className='linkNavBar' onClick={() => goRoute('/profile')}>Profile</button> : <button className='linkNavBar' onClick={() => goRoute('/subscribe')}>Subscribe</button>}
                                        <button className='linkNavBar' onClick={() => goRoute('/docs/intro')}>Usage</button>
                                        <button className='linkNavBar' onClick={() => { goRoute('/blog') }}>Blog</button>
                                        <a href="mailto:contact@withar.co" className='linkNavBar' id='contactMobile'>Contact</a>
                                        <button id='logoutMobile' onClick={logout}>Logout</button>
                                    </> : null :
                                    <>
                                        <button className='linkNavBar' onClick={() => goRoute('/')}>Home</button>
                                        <button className='linkNavBar' onClick={() => { setMenuMobile("linksBarMobile"); props.setScrollDocument('').then(() => { navigate('/#pricing') }) }}>Subscribe</button>
                                        <button className='linkNavBar' onClick={() => goRoute('/docs/intro')}>Usage</button>
                                        <button className='linkNavBar' onClick={() => { goRoute('/blog') }}>Blog</button>
                                        <a href="mailto:contact@withar.co" className='linkNavBar' id='contactMobile'>Contact</a>
                                        <button onClick={() => { goRoute('/login') }} className='getInMobile'>Login</button>
                                        <button onClick={() => { goRoute('/register') }} className='registerButtonColors getInMobile'>Sign up</button>
                                    </>
                            }
                        </div>
                    </ClickAwayListener>}

                {menuMobile === "linksBarMobileActive" &&
                    <div id='overlay'></div>}
            </nav>
            <Outlet></Outlet>
            <footer id='footer'>
                <a className="footerText" href='https://achilledorier.com' target="_blank"
                    rel="noopener noreferrer">Who Am I ?</a>
                <a className="footerText" href='mailto:contact@withar.co' target="_blank"
                    rel="noopener noreferrer">Contact</a>
                <p className="footerText">withar.co 2024</p>
            </footer>
        </div>
    );
};

export default Base;
