import React, { useState, useEffect } from 'react';
import "./HabitCell.css"


const CellBool = (props) => {
    function changeCellState() {
        let newState = props.cellData === 2 ? 1 : props.cellData === 1 ? 0 : props.cellData === 0 ? 2 : 1
        props.changeCellValue(props.date, props.cellType, newState)
    }
    return (
        <div className={ props.cellData === 2 ? "habitCell" : props.cellData === 1 ? "habitCell green" : props.cellData === 0 ? "habitCell red" : "habitCell"} onClick={changeCellState} id={props.date===`${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`?"todayCell":null}>
        </div>
    );
};

export default CellBool;

const today = new Date();
