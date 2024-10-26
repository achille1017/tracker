import React, { useState, useEffect } from 'react';
import "./HabitsManager.css"
import { SERVER_NAME } from '../../config.js';
import valid from "../../assets/valid.png"

const HabitsManager = (props) => {
    const [newHabit, setNewHabit] = useState("")
    const [newHabitType, setNewHabitType] = useState("bool")
    const [buttonStatus, setButtonStatus] = useState("normal")
    function createNewHabit() {
        fetch(SERVER_NAME + "/newhabit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
            },
            body: JSON.stringify({ "newHabit": newHabit, "newHabitType": newHabitType }),
            credentials: 'include'
        })
            .then(response => {
                if (response.status === 200) {
                    props.updateData()
                    setButtonStatus("added")
                    setTimeout(() => { setButtonStatus("normal") }, 3000)
                }
            })
    }
    return (
        <div id={props.id} className='habitsManager'>
            <p id='addANewHabit'>Add a new habit tracker : </p>
            
            <input id="newHabitName" type='text' value={newHabit} onChange={(e) => setNewHabit(e.target.value)} placeholder='Name of new habit'></input>
            <select id='newHabitType' value={newHabitType} onChange={(e) => setNewHabitType(e.target.value)}>
                <option value="bool">Yes/no</option>
                <option value="number">Number</option>
                <option value="text">Text</option>
            </select>
            {buttonStatus === "normal" ? <button onClick={createNewHabit} id='newTracker'>New tracker</button> : <img className='validHabitExampleHabitManager' src={valid}></img>}
        </div>
    );
};

export default HabitsManager;
