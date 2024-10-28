import React, { Component, useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrackerApp from './components/TrackerApp/TrackerApp';
import Base from './components/Base/Base'
import Landing from './components/Landing/Landing';
import Profile from './components/Profile/Profile'
import { SERVER_NAME } from './config.js';
import SubscriptionManager from './components/SubscriptionManager/SubscriptionManager.js';
import PayementWaiter from './components/PayementWaiter/PayementWaiter.js';
import Login from './components/Login/Login.js';
import Error from "./components/Error/Error.js"
import Confirmation from './components/Confirmation/Confirmation.js';
import Usage from './components/Usage/Usage.js';

function App() {
  const [logged, setLogged] = useState()
  const [plan, setPlan] = useState()
  const [profile, setProfile] = useState({})

  function setScrollDocument(scroll) {
    document.body.style.overflow = scroll
  }
  function updateProfile() {
    return new Promise((resolve, reject) => {
      fetch(SERVER_NAME + "/getprofile", {
        credentials: 'include',
      }).then(res => {
        if (res.status === 200) {
          res.json().then(
            data => { setProfile(data); resolve(data) }
          )
        }
      })
    })
  }
  async function updateLogged() {
    return new Promise((resolve, reject) => {

      fetch(SERVER_NAME + "/islogged", { method: "GET", credentials: 'include' })
        .then(res => {
          if (res !== true) {
            res.text().then(text => {
              if (text === "true") {
                setLogged(true)
                resolve(true)
              }
              else {
                setLogged(false); resolve(false)
              }
            })
          }
        })
    })
  }
  async function updatePlan() {
    return new Promise((resolve, reject) => {

      fetch(SERVER_NAME + "/plan", {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json', // Indicate that you're sending JSON
        },
      })
        .then(response => {
          if (response.status === 200) {
            response.json().then(data => {
              setPlan(data.plan)
              resolve(data.plan)
            })
          }
        })
    })
  }
  useState(() => {
    updateLogged()
  }, [])
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base setScrollDocument={setScrollDocument} updateLogged={updateLogged} logged={logged} updatePlan={updatePlan} plan={plan} profile={profile}></Base>}>
          <Route path="/" element={<Landing logged={logged}></Landing>} />
          <Route path="/tracker" element={<TrackerApp profile={profile} updateProfile={updateProfile} logged={logged}></TrackerApp>} />
          <Route path="/login" element={<Login updateLogged={updateLogged}></Login>} />
          <Route path="/profile" element={<Profile updatePlan={updatePlan} plan={plan}></Profile>} />
          <Route path='/subscribe' element={<SubscriptionManager logged={logged}></SubscriptionManager>}></Route>
          <Route path='/payement' element={<PayementWaiter updateLogged={updateLogged} updatePlan={updatePlan}></PayementWaiter>}></Route>
          <Route path='/docs' element={<Usage setScrollDocument={setScrollDocument}></Usage>}></Route>
          <Route path='/docs/:document' element={<Usage setScrollDocument={setScrollDocument}></Usage>}></Route>
          <Route path='/docs/:document/:section' element={<Usage setScrollDocument={setScrollDocument}></Usage>}></Route>
          <Route path='/confirmation' element={<Confirmation></Confirmation>}></Route>
          <Route path="/*" element={<Error></Error>}></Route>
        </Route>
      </Routes>
    </BrowserRouter >



  );
}

export default App;



