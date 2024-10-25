
import React, { useEffect, useState } from 'react';
import "./Usage.css"
import "./TrackDocs.css"

import botImg from "../../assets/Arco1.png"
import { Link, useSearchParams } from 'react-router-dom';

const Arco = (props) => {

    return (
    <div id='arcoDocs'>
        <p className='titleTrackDocs'></p>
        <p className='textTrackDocs'></p>
        <img id='arcoDocs' src={botImg}></img>
    </div>
    );
};

export default Arco;
