import React, { useState, useEffect } from 'react';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';

import "./CellText.css"


const CellText = (props) => {
    return (
        <div className="cellText habitCell" onClick={()=>props.openTextCellEditor(props.cellData,props.date,props.cellType)} id={props.date===`${String(today.getDate()).padStart(2, '0')}-${String(today.getMonth() + 1).padStart(2, '0')}-${today.getFullYear()}`?"todayCell":null}>
            <p className='textCellDisplay'>{props.cellData}</p>
        </div>
    );
};

export default CellText;

const today = new Date();
