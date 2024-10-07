import React, { useState, useEffect } from 'react';
import "./Landing.css"
import screenshot1 from "../../assets/screenshot2.png"
import valid from "../../assets/valid.png"
import { useNavigateAndScroll } from "../functions.js"
import { useLocation } from 'react-router-dom';


const Landing = (props) => {
    const goRoute = useNavigateAndScroll()
    const [offersBoxMobile, setOffersBoxMobile] = useState("monthly")
    const location = useLocation();
    useEffect(() => {
        if (location.pathname === '/' && location.hash === '#pricing') {
            console.log("#pricing")
          const element = document.getElementById("pricing");
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, [location]);
    
    return (
        <div id='landing'>
            <div id='firstBoxLanding'>
                <div id='titleBox'>
                    <p id='title1'>GET</p>
                    <p id='title1'>PRODUCTIVE</p>
                    <p id='title1'>WITH ARCO</p>
                    <p id='poweredByAI'>Powered by AI</p>
                </div>
                <div id='screenshot1Box'><img id='screenshot1' src={screenshot1}></img><p id='legend1'>Get daily habits and track your progress towards success </p></div>
            </div>
            <div id='secondBoxLanding'>
                <p className='text1'>Start tracking your daily habits and improve your productivity. </p>
                <div id="box2Texts">
                    <div className='box2TextsDiv'><p className='box2TextP'>- Get yourself in a constant routine of good practices</p><img className='validImg' src={valid}></img></div>
                    <div className='box2TextsDiv'>
                        <p className='box2TextP'>- Receive advices from our virtual assistant <span id='poweredByAI'>Powered by AI</span>
                        </p>
                        <img className='validImg' src={valid}></img>
                    </div>
                    <div className='box2TextsDiv'><p className='box2TextP'>- Follow week after week your progression and be sure to do better</p><img className='validImg' src={valid}></img></div>
                    <div className='box2TextsDiv'><p className='box2TextP'>- Beat bad habits FOREVER</p><img className='validImg' src={valid}></img></div>
                    <div className='box2TextsDiv' id='pricing'><p className='box2TextP'>- No gamification, we're not here to play</p><img className='validImg' src={valid}></img></div>

                </div>
            </div>
            <div id='pricingBox'>
                <p id='toStartP'>To start to work with Arco</p>
                <div id='offersBox'>
                    <div className='offerDiv'>
                        <p className='offerDivP1'>Monthly</p>
                        <p className='offerDivP2'>3$/month</p>
                        <p className='offerDivP3'>Try it just one month..</p>

                        <button className='getStarted' onClick={() => goRoute('/login')}>SUBSCRIBE NOW</button>
                    </div>
                    <div className='offerDiv'>
                        <p className='offerDivP1'>Yearly</p>
                        <p className='offerDivP2'>25$/year</p>
                        <p className='offerDivP3'>30% cheaper than monthly bill</p>

                        <button className='getStarted' onClick={() => goRoute('/login')}>SUBSCRIBE NOW</button>
                    </div>
                    <div className='offerDiv'>
                        <p className='offerDivP1'>Lifetime</p>
                        <p className='offerDivP2'>60$</p>
                        <p className='offerDivP3'>Work with Arco forever</p>

                        <button className='getStarted' onClick={() => goRoute('/login')}>BUY NOW</button>
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
                        <p className='offerDivP2'>{offersBoxMobile === "monthly" ? "3$/month" : offersBoxMobile === "annual" ? "25$/year" : "60$"}</p>
                        <p className='offerDivP3'>{offersBoxMobile === "monthly" ? "Try it just one month.." : offersBoxMobile === "annual" ? "30% cheaper than monthly bill" : "Work with Arco forever"}</p>
                        <button className='getStarted' onClick={() => goRoute('/login')}>{offersBoxMobile === "lifetime" ? "BUY NOW" : "SUBSCRIBE NOW"}</button>
                    </div>
                </div>
            </div>
            <div id='thirdBoxLanding'>
                <p className='text1'>Why did I build withar.co ? </p>
                <p id='whoMadeItP'>In 2024, I tried to launch with a bad timing a web3 project. Figuring out what my errors were, I quickly observed that my producitvity was the main problem. I was waking up at 11, sleeping at 2 or 3 and working too late.. Once that project I putted a lot of hope into was dead, I had to do something better and I started by working on myself tracking my daily habits to get productive for real. </p>
            </div>
        </div>
    );
};

export default Landing;
