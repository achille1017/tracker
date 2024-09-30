import React, { useEffect, useState } from 'react';
import "./Profile.css"

import { SERVER_NAME } from '../../config.js';

const Profile = (props) => {
    const [profile, setProfile] = useState({})
    const [name, setName] = useState('')
    const [language, setLanguage] = useState('')
    const [job, setJob] = useState('')

    useEffect(() => {
        updateProfile()
    }, [])
    function updateProfile() {
        return new Promise((resolve, reject) => {
            fetch(SERVER_NAME + "/profile", {
                credentials: 'include',
            }).then(res => {
                if (res.status === 200) {
                    res.json().then(
                        data => { setProfile(data); setLanguage(data.language); setJob(data.job); setName(data.name); resolve(data) }
                    )
                }
            })
        })
    }
    return (
        <div id='profile'>
            <p id='title1Profile'>Hello, {name}.</p>
            <div id='bigProfileDiv'>
                <div className='profileDiv'><p>Your name : </p><input onChange={(e) => { setName(e.target.value) }} value={name} type='text'></input></div>

                <div className='profileDiv'><p>Your language : </p><input onChange={(e) => { setLanguage(e.target.value) }} value={language} type='text'></input></div>
                <div className='profileDiv'><p>Your job : </p><input onChange={(e) => { setJob(e.target.value) }} value={job} type='text'></input></div>
                <div className='profileDiv'><p>Your plan : Free/Month/Life</p><button>Upgrade</button></div>
            </div>

        </div>
    );
};

export default Profile;
