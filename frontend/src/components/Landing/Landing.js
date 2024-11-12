import React, { useState, useEffect } from 'react';
import "./Landing.css"
import screenshot1 from "../../assets/screenTracker.png"
import valid from "../../assets/valid.png"
import { useNavigateAndScroll } from "../functions.js"
import { useLocation } from 'react-router-dom';
import botImg from "../../assets/Arco1.png"
import WhiteList from '../WhiteList/WhiteList.js';
import blackDot from "../../assets/black-circle.png"
import { Helmet } from 'react-helmet';

const Landing = (props) => {
    const goRoute = useNavigateAndScroll()
    const [offersBoxMobile, setOffersBoxMobile] = useState("monthly")
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/' && location.hash === '#pricing') {
            const element = document.getElementById("toStartP");
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }, [location]);

    return (
        <div id='landing'>
            <Helmet>
                <title>With Arco | Get productive today</title>
                <meta name="description" content="With Arco, complete your daily habits with our AI-powered virtual assistant. Get personalized advice and track your progress effortlessly." />
                <meta property="og:title" content="With Arco | Get productive today" />
                <meta property="og:description" content="With Arco, complete your daily habits with our AI-powered virtual assistant. Get personalized advice and track your progress effortlessly." />
                <meta property="og:image" content="https://withar.co/static/media/Arco1.c74a12087a62cf33a280.png" />
            </Helmet>
            <div id='firstBoxLanding'>
                <div id='titleBox'>
                    <h1 id='title1'>GET</h1>
                    <h1 id='title1'>PRODUCTIVE</h1>
                    <h1 id='title1'>WITH ARCO</h1>
                    <h4 id='poweredByAI'>Powered by AI</h4>
                </div>
                <div id='screenshot1Box'><img id='screenshot1' src={screenshot1}></img><p id='legend1'>Get daily habits and track your progress towards success </p></div>
            </div>
            <div id='secondBoxLanding'>
                <h2 className='text1'>Start tracking your daily habits and improve your productivity. </h2>
                <div id='boxArcoLanding'>
                    <div id="box2Texts">
                        <div className='box2TextsDiv'><img className='blackDot' src={blackDot}></img><p className='box2TextP'> Get yourself in a constant routine of good practices <img className='validImg' src={valid}></img></p></div>
                        <div className='box2TextsDiv'><img className='blackDot' src={blackDot}></img>
                            <p className='box2TextP'> Receive advices from our virtual assistant <span id='poweredByAI'>Powered by AI</span> <img className='validImg' src={valid}></img></p>

                        </div>
                        <div className='box2TextsDiv'><img className='blackDot' src={blackDot}></img><p className='box2TextP'> Follow week after week your progression and be sure to do better <img className='validImg' src={valid}></img></p></div>
                        <div className='box2TextsDiv'><img className='blackDot' src={blackDot}></img><p className='box2TextP'>Beat bad habits FOREVER <img className='validImg' src={valid}></img></p></div>
                        <div className='box2TextsDiv' id='pricing'><img className='blackDot' src={blackDot}></img> <p className='box2TextP'>No gamification, we're not here to play <img className='validImg' src={valid}></img></p></div>

                    </div>
                    <div id='arcoImgDiv'>
                        <img id='arcoImg' src={botImg}></img>
                        <p id='arcoText'>Meet Arco, our virtual assistant that will guide you to productivity.</p>
                        <button className='howDoesItWorks' onClick={() => goRoute('/docs/intro')}>How does it works ?</button>
                    </div>
                </div>

            </div>
            {<div id='pricingBox'>
                <h2 id='toStartP'>To start to work with Arco</h2>
                <p id='promoP'>-50 % on all offers with code LAUNCH50</p>

                <div id='offersBox'>
                    <div className='offerDiv'>
                        <p className='offerDivP1'>Monthly</p>
                        <p className='offerDivP2'><span className='lineTrough'>6.99€</span> 3.49€/month</p>
                        <p className='offerDivP3'>Try it just one month..</p>

                        <button className='getStarted' onClick={() => goRoute(props.logged ? '/subscribe' : '/register')}>SUBSCRIBE NOW</button>
                    </div>
                    <div className='offerDiv'>
                        <p className='offerDivP1'>Yearly</p>
                        <p className='offerDivP2'><span className='lineTrough'>49.99€</span> 24.99€/year</p>
                        <p className='offerDivP3'>40% cheaper than monthly bill</p>

                        <button className='getStarted' onClick={() => goRoute(props.logged ? '/subscribe' : '/register')}>SUBSCRIBE NOW</button>
                    </div>
                    <div className='offerDiv'>
                        <p className='offerDivP1'>Lifetime</p>
                        <p className='offerDivP2'><span className='lineTrough'>59.99€</span> 29.99€</p>
                        <p className='offerDivP3'>Work with Arco forever</p>

                        <button className='getStarted' onClick={() => goRoute(props.logged ? '/subscribe' : '/register')}>BUY NOW</button>
                    </div>
                </div>
                <div id='offersBoxMobile'>
                    <div id="selectorOffersMobile">
                        <button className={offersBoxMobile === "monthly" ? "selectorOffersMobileActive" : "selectorOffersMobileInactive"} onClick={() => { setOffersBoxMobile("monthly") }}>Monthly</button>
                        <button className={offersBoxMobile === "annual" ? "selectorOffersMobileActive" : "selectorOffersMobileInactive"} onClick={() => { setOffersBoxMobile("annual") }}>Annual</button>
                        <button className={offersBoxMobile === "lifetime" ? "selectorOffersMobileActive" : "selectorOffersMobileInactive"} onClick={() => { setOffersBoxMobile("lifetime") }}>Lifetime</button>
                    </div>
                    <div className='offerDiv'>
                        <p className='offerDivP1'>{offersBoxMobile === "monthly" ? "Monthly" : offersBoxMobile === "annual" ? "Annual" : "Lifetime"}</p>
                        {offersBoxMobile === "monthly" ? <p className='offerDivP2'><span className='lineTrough'>6.99€</span> 3.49€/month</p>
                            : offersBoxMobile === "annual" ? <p className='offerDivP2'><span className='lineTrough'>49.99€</span> 24.99€/year</p>
                                : <p className='offerDivP2'><span className='lineTrough'>59.99€</span> 29.99€</p>
                        }                        <p className='offerDivP3'>{offersBoxMobile === "monthly" ? "Try it just one month.." : offersBoxMobile === "annual" ? "40% cheaper than monthly bill" : "Work with Arco forever"}</p>
                        <button className='getStarted' onClick={() => goRoute(props.logged ? '/subscribe' : '/register')}>{offersBoxMobile === "lifetime" ? "BUY NOW" : "SUBSCRIBE NOW"}</button>
                    </div>
                </div>
            </div>}
            {!props.logged &&
                <div id='alreadyDiv'>
                    <p id='alreadyP'>Already working with Arco ?</p>
                    <button id='alreadyButton' onClick={() => { goRoute('/login') }}>LOGIN</button>
                </div>}
            {/*<WhiteList></WhiteList>*/}
            <div id='thirdBoxLanding'>
                <h2 className='text1'>Why did I build withar.co ? </h2>
                <p id='whoMadeItP'>In 2024, I tried to launch with a bad timing a web3 project. Figuring out what my errors were, I quickly observed that my producitvity was the main problem. I was waking up at 11, sleeping at 2 or 3 and working too late.. Once that project I putted a lot of hope into was dead, I had to do something better and I started by working on myself tracking my daily habits to get productive for real. </p>
            </div>
        </div>
    );
};

export default Landing;
