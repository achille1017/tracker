
import React, { useEffect, useState } from 'react';
import "./Usage.css"
import "./TrackDocs.css"

import botImg from "../../assets/Arco1.png"
import { Link, useSearchParams } from 'react-router-dom';

const TrackDocs = (props) => {

    return (<div className='trackDocs'>
        <p className='titleTrackDocs'>{props.title}</p>
        <p className='textTrackDocs'>{props.text}</p>
        <img className='gifDocs' src={props.img}></img>
    </div>
    );
};

export default TrackDocs;
