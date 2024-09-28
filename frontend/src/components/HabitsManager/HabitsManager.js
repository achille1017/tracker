import React, { useState, useEffect } from 'react';
import "./HabitsManager.css"
import { SERVER_NAME } from '../../config.js';

const HabitsManager = (props) => {
    const [newHabit,setNewHabit]=useState("")
    const [newHabitType,setNewHabitType]=useState("bool")

    function createNewHabit() {
        fetch(SERVER_NAME+"/newhabit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Indicate that you're sending JSON
            },
            body: JSON.stringify({"newHabit":newHabit,"newHabitType":newHabitType}) ,
            credentials:'include'
        })
            .then(response => {
                if(response.status===200){
                    props.updateData()
                }
            })
    }
    return (
        <div id={props.id} className='habitsManager'>
            <p id='addANewHabit'>Add a new habit tracker : </p>
            <select id='newHabitType' value={newHabitType} onChange={(e) => setNewHabitType(e.target.value)}>
                <option value="bool">Bool</option>
                <option value="text">Text</option>
                <option value="number">Number</option>
            </select>
            <input id="newHabitName" type='text' value={newHabit} onChange={(e) => setNewHabit(e.target.value)} placeholder='name of new habit'></input>
            <button onClick={createNewHabit} id='newTracker'>New tracker</button>
        </div>
    );
};

export default HabitsManager;
