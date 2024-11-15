import React, { useEffect, useState } from 'react';
import "./Usage.css"
import botImg from "../../assets/Arco1.png"
import { useSearchParams, useParams, useLocation } from 'react-router-dom';
import Intro from './Intro';
import TrackDocs from './TrackDocs';

import boolGif from "./bool.gif"
import addGif from "./add.gif"
import numberGif from "./number.gif"
import textGif from "./text.gif"
import manageGif from "./manage.gif"


import boolGifMobile from "./boolMobile.gif"
import addGifMobile from "./addMobile.gif"
import numberGifMobile from "./numberMobile.gif"
import textGifMobile from "./textMobile.gif"
import manageGifMobile from "./manageMobile.gif"


import docs from "./docs.json"
import TrackIt from './TrackIt';
import Arco from './Arco';
import chevron from "../../assets/right-chevron.png"
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useNavigateAndScroll } from "../functions.js"
import { Helmet } from 'react-helmet';

const Usage = (props) => {
    const location = useLocation();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    }, [])
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
    }, [location.pathname])
    const preGoRoute = useNavigateAndScroll()
    const [navBarMobile, setNavBarMobile] = useState(false)
    const { document, section } = useParams();
    function toggleNavBarMobile() {
        setNavBarMobile(navBarMobile ? false : true)
        props.setScrollDocument(navBarMobile ? '' : 'hidden')
    }
    const goRoute = (route) => {
        setNavBarMobile(false)
        props.setScrollDocument('').then(() => preGoRoute(route)
        )
    }
    return (
        <div id='docs'>
            <Helmet>
                <title>With Arco | Get productive today</title>
                <meta name="description" content="With Arco, complete your daily habits with our AI-powered virtual assistant. Get personalized advice and track your progress effortlessly." />
                <meta property="og:title" content="With Arco | Get productive today" />
                <meta property="og:description" content="With Arco, complete your daily habits with our AI-powered virtual assistant. Get personalized advice and track your progress effortlessly." />
                <meta property="og:image" content="https://withar.co/static/media/Arco1.c74a12087a62cf33a280.png" />
            </Helmet>
            <h1 id='bigTitleUsage'>How to work with Arco ?</h1>
            <div id='docsBox'>
                <div id='navBarDocs'>
                    <button onClick={() => goRoute("/docs/intro")} className='buttonNavBarDocs'>Introduction</button>
                    <button onClick={() => goRoute("/docs/track")} className='buttonNavBarDocs titleNavBarDocs'>Habits tracking</button>
                    <div className='sectionNavBarUsage'>
                        <button onClick={() => goRoute("/docs/track/add")} className='subbuttonNavBarDocs'>Track a new habit</button>
                        <button onClick={() => goRoute("/docs/track/bool")} className='subbuttonNavBarDocs'>Yes/no habits</button>
                        <button onClick={() => goRoute("/docs/track/number")} className='subbuttonNavBarDocs'>Numeric habits</button>
                        <button onClick={() => goRoute("/docs/track/text")} className='subbuttonNavBarDocs'>Text habits</button>
                        <button onClick={() => goRoute("/docs/track/manage")} className='subbuttonNavBarDocs'>Manage an habit</button>
                    </div>
                    <button onClick={() => goRoute("/docs/arco")} className='buttonNavBarDocs'>Arco</button>
                </div>
                <div id='boxUsage'>
                    {document === "intro" ? <Intro></Intro> :
                        document === "track" ? section === undefined ? <TrackIt></TrackIt> :
                            <TrackDocs img={
                                section === "bool" ? [boolGif, boolGifMobile] :
                                    section === "add" ? [addGif, addGifMobile] :
                                        section === "number" ? [numberGif, numberGifMobile] :
                                            section === "text" ? [textGif, textGifMobile] :
                                                section === "manage" ? [manageGif, manageGifMobile] : null}
                                title={docs[section].title} text={docs[section].text}></TrackDocs> : document === "arco" ? <Arco></Arco> : <Intro></Intro>}
                </div>
            </div>
            {!navBarMobile && <button id='navBarMobileButton' onClick={toggleNavBarMobile}><img id='chevron' src={chevron}></img></button>}
            {navBarMobile &&
                <ClickAwayListener onClickAway={toggleNavBarMobile} touchEvent={false}>

                    <div id='navBarDocsMobile'>
                        <button onClick={() => goRoute("/docs/intro")} className='buttonNavBarDocs'>Introduction</button>
                        <button onClick={() => goRoute("/docs/track")} className='buttonNavBarDocs titleNavBarDocs'>Habits tracking</button>
                        <div className='sectionNavBarUsage'>
                            <button onClick={() => goRoute("/docs/track/add")} className='subbuttonNavBarDocs'>Track a new habit</button>
                            <button onClick={() => goRoute("/docs/track/bool")} className='subbuttonNavBarDocs'>Yes/no habits</button>
                            <button onClick={() => goRoute("/docs/track/number")} className='subbuttonNavBarDocs'>Numeric habits</button>
                            <button onClick={() => goRoute("/docs/track/text")} className='subbuttonNavBarDocs'>Text habits</button>
                            <button onClick={() => goRoute("/docs/track/manage")} className='subbuttonNavBarDocs'>Manage an habit</button>

                        </div>
                        <button onClick={() => goRoute("/docs/arco")} className='buttonNavBarDocs'>Arco</button>
                    </div>
                </ClickAwayListener>}
            {navBarMobile &&
                <div id='overlayNavBarMobile'></div>}
        </div>
    );
};

export default Usage;
