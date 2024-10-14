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

function App() {
  const [logged, setLogged] = useState()
  const [plan, setPlan] = useState()

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
        <Route path="/" element={<Base updateLogged={updateLogged} logged={logged} updatePlan={updatePlan} plan={plan}></Base>}>
          <Route path="/" element={<Landing></Landing>} />

          <Route path="/*" element={<Error></Error>}></Route>

        </Route>
      </Routes>
    </BrowserRouter >



  );
}

export default App;
/*
 <Route path="/tracker" element={<TrackerApp logged={logged}></TrackerApp>} />
          <Route path="/login" element={<Login updateLogged={updateLogged}></Login>} />
          <Route path="/profile" element={<Profile updatePlan={updatePlan} plan={plan}></Profile>} />
          <Route path='/subscribe' element={<SubscriptionManager logged={logged}></SubscriptionManager>}></Route>
          <Route path='/payement' element={<PayementWaiter updateLogged={updateLogged} updatePlan={updatePlan}></PayementWaiter>}></Route>
          give me a strategy to get my first 5 users then 100 users for my saas. My saas is a website that allows user to tracker their daily habits and get daily advices from a virtual assistant powered by ai that analyse data of the user
          */

          