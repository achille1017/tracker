import React, { useEffect, useState } from 'react';
import "./Usage.css"
import botImg from "../../assets/Arco1.png"
import {  useSearchParams, useParams } from 'react-router-dom';
import Intro from './Intro';
import TrackDocs from './TrackDocs';
import boolGif from "./bool.gif"
import addGif from "./addHabit.gif"
import numberGif from "./number.gif"
import textGif from "./text.gif"
import manageGif from "./manage.gif"
import docs from "./docs.json"
import TrackIt from './TrackIt';
import Arco from './Arco';
import chevron from "../../assets/right-chevron.png"
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { useNavigateAndScroll } from "../functions.js"

const Usage = (props) => {
    const preGoRoute = useNavigateAndScroll()

    const [navBarMobile, setNavBarMobile] = useState(false)
    const { document, section } = useParams();
    function toggleNavBarMobile() {
        setNavBarMobile(navBarMobile ? false : true)
        props.setScrollDocument(navBarMobile ? '' : 'hidden')

    }
    const goRoute = (route) => {
        setNavBarMobile(false)
        props.setScrollDocument('')
        preGoRoute(route)
    }
    return (
        <div id='docs'>
            <p id='bigTitleUsage'>How to work with Arco ?</p>
            <div id='docsBox'>
                <div id='navBarDocs'>
                    <button onClick={()=>goRoute("/docs/intro")} className='buttonNavBarDocs'>Introduction</button>
                    <button onClick={()=>goRoute("/docs/track")} className='buttonNavBarDocs titleNavBarDocs'>Habits tracking</button>
                    <div className='sectionNavBarUsage'>
                        <button onClick={()=>goRoute("/docs/track/add")} className='subbuttonNavBarDocs'>Track a new habit</button>
                        <button onClick={()=>goRoute("/docs/track/bool")} className='subbuttonNavBarDocs'>Yes/no habits</button>
                        <button onClick={()=>goRoute("/docs/track/number")} className='subbuttonNavBarDocs'>Numeric habits</button>
                        <button onClick={()=>goRoute("/docs/track/text")} className='subbuttonNavBarDocs'>Text habits</button>
                        <button onClick={()=>goRoute("/docs/track/manage")} className='subbuttonNavBarDocs'>Move/delete an habit</button>
                    </div>
                    <button onClick={()=>goRoute("/docs/arco" )}className='buttonNavBarDocs'>Arco</button>
                </div>
                <div id='boxUsage'>
                    {document === "intro" ? <Intro></Intro> : document === "track" ? section === undefined ? <TrackIt></TrackIt> : <TrackDocs img={section === "bool" ? boolGif : section === "add" ? addGif : section === "number" ? numberGif : section === "text" ? textGif :section==="manage"?manageGif: null} title={docs[section].title} text={docs[section].text}></TrackDocs> : document === "arco" ? <Arco></Arco> : null}
                </div>
            </div>
            {!navBarMobile && <button id='navBarMobileButton' onClick={toggleNavBarMobile}><img id='chevron' src={chevron}></img></button>}
            {navBarMobile &&
                <ClickAwayListener onClickAway={toggleNavBarMobile} touchEvent={false}>

                    <div id='navBarDocsMobile'>
                        <button onClick={()=>goRoute("/docs/intro")} className='buttonNavBarDocs'>Introduction</button>
                        <button onClick={()=>goRoute("/docs/track")} className='buttonNavBarDocs titleNavBarDocs'>Habits tracking</button>
                        <div className='sectionNavBarUsage'>
                            <button onClick={()=>goRoute("/docs/track/add")} className='subbuttonNavBarDocs'>Track a new habit</button>
                            <button onClick={()=>goRoute("/docs/track/bool")} className='subbuttonNavBarDocs'>Yes/no habits</button>
                            <button onClick={()=>goRoute("/docs/track/number")} className='subbuttonNavBarDocs'>Numeric habits</button>
                            <button onClick={()=>goRoute("/docs/track/text")} className='subbuttonNavBarDocs'>Text habits</button>
                            <button onClick={()=>goRoute("/docs/track/manage")} className='subbuttonNavBarDocs'>Move/delete an habit</button>

                        </div>
                        <button onClick={()=>goRoute("/docs/arco" )}className='buttonNavBarDocs'>Arco</button>
                    </div>
                </ClickAwayListener>}
                {navBarMobile &&
                    <div id='overlayNavBarMobile'></div>}
        </div>
    );
};

export default Usage;
