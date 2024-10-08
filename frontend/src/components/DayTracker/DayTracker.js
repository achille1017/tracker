import React, { useState, useEffect } from 'react';
import "./DayTracker.css"
import HabitCell from '../HabitCell/HabitCell';
import CellBool from '../CellBool/CellBool';
import CellText from '../CellText/CellText';
import CellNumber from '../CellNumber/CellNumber';

const DayTracker = (props) => {
    function reorderObject(order, data) {
        const orderedData = {};
    
        // Iterate over the keys in the order object
        for (const key of Object.keys(order)) {
            if (data.hasOwnProperty(key)) {
                orderedData[key] = data[key]; // Add the key-value pair to the new object
            }
        }
    
        // Optionally, add any additional keys from the original data that are not in the order object
        for (const key of Object.keys(data)) {
            if (!orderedData.hasOwnProperty(key)) {
                orderedData[key] = data[key];
            }
        }
    
        return orderedData;
    }

    return (
        <div className='dayLine'>
            <div className="dateCell" id={props["dataDay"]["date"]===`${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`?"todayCell":null}>
                    <p>{props["dataDay"]["date"].slice(0, -5)}</p>
                </div> 

            {Object.keys(reorderObject(props.habitsUser,props.dataDay)).map((habit, index) => (
                props.habitsUser[habit]==="bool"?<CellBool key={habit} changeCellValue={props.changeCellValue} cellType={habit} habitsUser={props.habitsUser} cellData={props["dataDay"][habit]} date={props["dataDay"]["date"]}></CellBool>
                :props.habitsUser[habit]==="text"?<CellText openTextCellEditor={props.openTextCellEditor} key={habit} date={props["dataDay"]["date"]} cellType={habit} changeCellValue={props.changeCellValue} cellData={props["dataDay"][habit]}></CellText>
                :props.habitsUser[habit]==="number"?<CellNumber key={habit} date={props["dataDay"]["date"]} cellType={habit} changeCellValue={props.changeCellValue} cellData={props["dataDay"][habit]}></CellNumber>
                :null
            ))}
        </div>
    );
};

export default DayTracker;
const today = new Date();
