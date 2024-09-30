import React from 'react';
import "./ContextMenu.css"
import { SERVER_NAME } from '../../config.js';

const ContextMenu = ({ habitsUser, position, onClose, onSelect, habit, updateData }) => {
  function deleteColumn() {
    onClose()
    fetch(SERVER_NAME + "/deletehabit", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate that you're sending JSON
      },
      body: JSON.stringify({ "habit": habit }),
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 200) {
          updateData()
        }
      })
  }
  function checkKeyPosition(obj, inputString) { // TODO à déplacer
    const keys = Object.keys(obj);
    const index = keys.indexOf(inputString);
    if (index === -1) {
      return "Not found";
    } else if (index === 0) {
      return "First position";
    } else if (index === keys.length - 1) {
      return "Last position";
    } else {
      return "Other position";
    }
  }
  function changeOrderHabit(habit,order){
    fetch(SERVER_NAME + "/changeorderhabit", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate that you're sending JSON
      },
      body: JSON.stringify({ "habit": habit, "order":order }),
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 200) {
          updateData()
        }
      })
  }
  return (
    <div
      style={{
        position: 'absolute',
        top: position.y,
        left: position.x,
        zIndex: 1000,
      }}
      id='contextMenu'
    >
      <p className='habitNameContextMenu'>{habit}</p>
      {checkKeyPosition(habitsUser, habit) !== "First position" && <button onClick={(e)=>{changeOrderHabit(habit,"up")}} className='contextMenuButton'>Move up</button>}
      <button className='contextMenuButton' onClick={deleteColumn}>Delete column</button>
      {checkKeyPosition(habitsUser, habit) !== "Last position" && <button onClick={(e)=>{changeOrderHabit(habit,"down")}} className='contextMenuButton'>Move down</button>}

    </div>
  );
};

export default ContextMenu;
