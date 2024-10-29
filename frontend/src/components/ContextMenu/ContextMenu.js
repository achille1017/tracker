import React, { useState, useEffect, useCallback } from 'react';
import "./ContextMenu.css"
import { SERVER_NAME } from '../../config.js';
import { checkKeyPosition } from "../functions.js"
import valid from "../../assets/valid.png"

const ContextMenu = ({ habitsUser, position, onClose, onSelect, habit, updateData }) => {
  const [habitName, setHabitName] = useState(habit)
  const [newName, setNewName] = useState("")
  const [stepRename, setStepRename] = useState(0)
  function deleteColumn() {
    onClose()
    fetch(SERVER_NAME + "/deletehabit", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate that you're sending JSON
      },
      body: JSON.stringify({ "habit": habitName }),
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 200) {
          updateData()
        }
      })
  }
  const handleWheel = useCallback((event) => {
    const direction = event.deltaY > 0 ? 'down' : 'up';
    if (direction) {
      onClose()
    }
  }, []);

  useEffect(() => {
    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
    };
  }, [handleWheel]);
  function changeOrderHabit(order) {
    fetch(SERVER_NAME + "/changeorderhabit", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Indicate that you're sending JSON
      },
      body: JSON.stringify({ "habit": habitName, "order": order }),
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 200) {
          updateData()
        }
      })
  }
  function renameColumn() {
    if (stepRename === 0) {
      setStepRename(1)
    }
    else if (stepRename === 1) {
      fetch(SERVER_NAME + "/renamehabit", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Indicate that you're sending JSON
        },
        body: JSON.stringify({ "habit": habitName, "name": newName }),
        credentials: 'include'
      })
        .then(response => {
          if (response.status === 200) {
            updateData()
            setStepRename(2)
            setHabitName(newName)
            setNewName("")
            setTimeout(() => {
              setStepRename(0)
            }, 4000)
          }
        })

    }
  }
  return (
    <div
      style={window.innerWidth > 1080 ? {
        position: 'absolute',
        top: position.y,
        left: position.x,
        zIndex: 1000,
      } : {
        position: 'fixed',
        top: '50vh',
        left: '50vw',
        transform: 'translate(-50%, -50%)',
        zIndex: 1000,
      }}
      id='contextMenu'
    >
      <p className='habitNameContextMenu'>{habitName}</p>
      {checkKeyPosition(habitsUser, habitName) !== "First position" && <button onClick={(e) => { changeOrderHabit("up") }} className='contextMenuButton'>Move up</button>}
      <button className='contextMenuButton' onClick={deleteColumn}>Delete habit</button>
      <>{stepRename === 0 ? <button className='contextMenuButton' onClick={renameColumn}>Rename habit</button> :
        stepRename === 1 ? <div id='renameDiv'><input type='text' value={newName} onChange={(e) => { setNewName(e.target.value) }} className='contextMenuButton' placeholder='New name'></input><button id='renameButton' onClick={renameColumn}>Rename</button></div> :
          stepRename === 2 ? <img id='validMenu' src={valid}></img> :
            null
      }</>
      {checkKeyPosition(habitsUser, habitName) !== "Last position" && <button onClick={(e) => { changeOrderHabit( "down") }} className='contextMenuButton'>Move down</button>}

    </div>
  );
};

export default ContextMenu;
