import React, { useEffect, useState } from 'react';
import "./Profile.css"

import { SERVER_NAME } from '../../config.js';

const Profile = (props) => {
    const [profile, setProfile] = useState({})
    const [name, setName] = useState('')
    const [language, setLanguage] = useState('')
    const [job, setJob] = useState('')
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        updateProfile()
        props.updatePlan()
    }, [])
    function updateProfile() {
        return new Promise((resolve, reject) => {
            fetch(SERVER_NAME + "/profile", {
                credentials: 'include',
            }).then(res => {
                if (res.status === 200) {
                    res.json().then(
                        data => { setProfile(data); setLanguage(data.language); setJob(data.job); setName(data.name);setLoaded(true); resolve(data) }
                    )
                }
            })
        })
    }
    return (
        <div id="appWaiter">
            {loaded ? <div id='profile'>
                <p id='title1Profile'>Hello, {name}.</p>
                <div id='bigProfileDiv'>
                    <div className='profileDiv'><p className="profileP">Name : </p><input onChange={(e) => { setName(e.target.value) }} value={name} type='text' className="inputProfile"></input></div>
                    <div className='profileDiv'><p className="profileP">Language : </p><input onChange={(e) => { setLanguage(e.target.value) }} value={language} type='text' className="inputProfile"></input></div>
                    <div className='profileDiv'><p className="profileP">Job : </p><input onChange={(e) => { setJob(e.target.value) }} value={job} type='text' className="inputProfile"></input></div>
                    <div className='profileDiv'><p className="profileP">Plan : {props.plan !== undefined ? props.plan.status : null}</p><a href="https://witharco.lemonsqueezy.com/billing">Manage</a></div>
                    <button id="saveChanges">Save changes</button>
                </div>
            </div> : null}
        </div>
    );
};

export default Profile;
