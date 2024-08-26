import React, { useState, useEffect } from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import "./CellNumber.css"


const CellNumber = (props) => {
    const [numberCell, setNumberCell] = useState(props.cellData)
    const handleChange = (event) => {
        setNumberCell(event.target.value.replace(/[^0-9.-]/g, ''));
    };
    useEffect(() => {
        props.changeCellValue(props.date, props.cellType, numberCell)
    }, [numberCell])
    return (

        <div className="cellNumber habitCell" id={props.date===`${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`?"todayCell":null}>
            <input className='numberInput' type='text' inputMode="numeric" onChange={handleChange} value={numberCell}></input>
        </div>
    );
};

export default CellNumber;
const today = new Date();
