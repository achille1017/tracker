import React, { useState, useEffect } from 'react';
import "./HabitCell.css"


const HabitCell = (props) => {
    const [selector, setSelector] = useState("none")

    function changeCellState() {
        if (props.habitName === "date") { return }
        else if (props.habitsUser[props.habitName] === "bool") {
            let newState = props.cellData === 2 ? 1 : props.cellData === 1 ? 0 : props.cellData === 0 ? 2 : 1
            props.changeCellValue(props.date, props.habitName, newState)
        }
        else if (props.habitsUser[props.habitName] === "number") {

        }

    }
    return (
        <div>
            {props.habitsUser === undefined ? null : props.habitsUser[props.habitName] === "bool" || props.habitName === "date" ?
                <div className={props.habitName === "date" ? "dateCell" : props.cellData === 2 ? "habitCell" : props.cellData === 1 ? "habitCell green" : props.cellData === 0 ? "habitCell red" : "habitCell"} onClick={changeCellState}>
                    <p>{props.habitName === "date" ? props.cellData : null}</p>
                </div> : null}
        </div>
    );
};

export default HabitCell;
