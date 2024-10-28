import React, { useEffect, useState } from 'react';
import "./Profile.css"

import { SERVER_NAME } from '../../config.js';

const Profile = (props) => {
    const [profile, setProfile] = useState({})
    const [name, setName] = useState('')
    const [language, setLanguage] = useState('')
    const [job, setJob] = useState('')
    const [objectives, setObjectives] = useState('')
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        updateProfile()
        props.updatePlan()
    }, [])
    function setProfileServer() {
        const profile = { "profileSet": 1, "name": name, "job": job, "language": language,"objectives":objectives }
        fetch(SERVER_NAME + "/setprofile", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
            },
            body: JSON.stringify({ "newProfile": profile }),
            credentials: 'include'
        })
            .then(response => {
                if (response.status === 200) { }
            })

    }
    function updateProfile() {
        return new Promise((resolve, reject) => {
            fetch(SERVER_NAME + "/profile", {
                credentials: 'include',
            }).then(res => {
                if (res.status === 200) {
                    res.json().then(
                        data => { setProfile(data); setLanguage(data.language); setJob(data.job); setName(data.name); setLoaded(true); resolve(data) }
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
                    <div className='profileDiv'><p className="profileP">Language : </p><select value={language} onChange={(e) => setLanguage(e.target.value)} className='selectProfileSetter'>
                        <option value="english">English</option>
                        <option value="french">Français</option>
                        <option value="spanish">Español</option>
                    </select></div>
                    
                    <div className='profileDiv'><p className="profileP">Job : </p><input onChange={(e) => { setJob(e.target.value) }} value={job} type='text' className="inputProfile"></input></div>
                    <div className='profileDiv'><p className="profileP">Goals and objectives : </p><textarea  onChange={(e) => { setObjectives(e.target.value) }} value={objectives} type='text' className="textareaProfile"></textarea></div>

                    <div className='profileDiv'><p className="profileP">Plan : {props.plan !== undefined ? props.plan.status : null}</p><a href="https://witharco.lemonsqueezy.com/billing">Manage</a></div>
                    <button id="saveChanges" onClick={setProfileServer}>Save changes</button>
                </div>
            </div> : null}
        </div>
    );
};

export default Profile;
