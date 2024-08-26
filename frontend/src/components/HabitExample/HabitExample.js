import React, { useState, useEffect } from 'react';
import "./HabitExample.css"
import valid from "../../assets/valid.png"
const HabitExample = (props) => {
    const [track, setTrack] = useState("track")

    function createNewHabit(newHabit, newHabitType) {
        fetch("http://localhost:4000/newhabit", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "newHabit": newHabit, "newHabitType": newHabitType }),
            credentials: 'include'
        })
            .then(response => {
                if (response.status === 200) {
                    setTrack("tracked")
                } else if (response.status === 409) {
                    setTrack("tracked")
                }
            })
    }
    return (

        <div className='habitExample' id={props.id}>
            <p className='habitName'>{props.habitName}</p>
            <p className='habitType'>{props.habitType === "bool" ? "Yes/no":props.habitType === "number" ? "Counter":props.habitType}</p>
            {track==="track" ? <button onClick={() => { createNewHabit(props.habitName, props.habitType) }} className='habitExampleButton'>Track it</button>:<img className='validHabitExample' src={valid}></img>}
        </div>

    )
};

export default HabitExample;