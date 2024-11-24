import React, { useEffect, useState } from 'react';
import "./Profile.css"
import { Helmet } from 'react-helmet';
import { SERVER_NAME } from '../../config.js';

const Profile = (props) => {
    const [profile, setProfile] = useState({})
    const [name, setName] = useState('')
    const [language, setLanguage] = useState('')
    const [job, setJob] = useState('')
    const [objectives, setObjectives] = useState('')
    const [loaded, setLoaded] = useState(false)
    useEffect(() => {
        props.updateProfile().then(data => { setProfile(data); setLanguage(data.language); setJob(data.job); setName(data.name); setLoaded(true); setObjectives(data.objectives); })
        props.updatePlan()
    }, [])
    function setProfileServer() {
        const profile = { "profileSet": 1, "name": name, "job": job, "language": language, "objectives": objectives }
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

    return (
        <div id="appWaiter">
            <Helmet>
                <title>With Arco | My profile</title>
                <meta name="description" content="With Arco, complete your daily habits with our AI-powered virtual assistant. Get personalized advice and track your progress effortlessly." />
                <meta property="og:title" content="With Arco | My profile" />
                <meta property="og:description" content="With Arco, complete your daily habits with our AI-powered virtual assistant. Get personalized advice and track your progress effortlessly." />
                <meta property="og:image" content="https://withar.co/static/media/Arco1.c74a12087a62cf33a280.png" />
            </Helmet>
            {loaded ? <div id='profile'>
                <p id='title1Profile'>Hello, {name}.</p>
                <div id='bigProfileDiv'>
                    <div className='profileDiv'><p className="profileP">Name : </p><input onChange={(e) => { setName(e.target.value) }} value={name} type='text' className="inputProfile"></input></div>
                    <div className='profileDiv'><p className="profileP">Language : </p>
                        <select value={language} onChange={(e) => setLanguage(e.target.value)} className='selectProfile'>
                            <option value="english">English</option>
                            <option value="french">Français</option>
                            <option value="spanish">Español</option>
                        </select>
                    </div>

                    <div className='profileDiv'><p className="profileP">Job : </p><input onChange={(e) => { setJob(e.target.value) }} value={job} type='text' className="inputProfile"></input></div>
                    <div className='profileDiv' id='profileDivGoals'><p className="profileP">Goals and objectives : </p><textarea onChange={(e) => { setObjectives(e.target.value) }} value={objectives} type='text' className="textareaProfile"></textarea></div>

                    <div className='profileDiv'><p className="profileP">Plan : {props.plan !== undefined ? props.plan.status : null}</p><a href="https://witharco.lemonsqueezy.com/billing">Manage</a></div>
                    <button id="saveChanges" onClick={setProfileServer}>Save changes</button>
                </div>
            </div> : null}
        </div>
    );
};

export default Profile;
