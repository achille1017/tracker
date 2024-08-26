import React, { Component, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TrackerApp from './components/TrackerApp/TrackerApp';
import Base from './components/Base/Base'
import Register from './components/Register/Register';
import Landing from './components/Landing/Landing';
function App() {
  const [logged, setLogged] = useState()
  async function updateLogged() {
    await new Promise(async next => {

      fetch("http://localhost:4000/islogged", { method: "GET", credentials: 'include' }).then(res => { if (res !== true) { res.text().then(text => { if (text === "true") { setLogged(true) } else { setLogged(false) } next() }) } })
    })
  }
  useState(() => {
    updateLogged()
  }, [])
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Base updateLogged={updateLogged} logged={logged}></Base>}>
          <Route path="/" element={<Landing></Landing>} />
          <Route path="/tracker" element={<TrackerApp logged={logged}></TrackerApp>} />
          <Route path="/register" element={<Register ></Register>} />

          <Route path="/*" element={<p>error</p>}></Route>
        </Route>

      </Routes>
    </BrowserRouter >



  );
}

export default App;
