import React from 'react';
import "./ContextMenu.css"
import { SERVER_NAME } from '../../config.js';

const ContextMenu = ({ position, onClose, onSelect, habit, updateData }) => {
  function deleteColumn() {
    onClose()
    fetch(SERVER_NAME+"/deletehabit", {
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
      <button id='deleteColumnButton' onClick={deleteColumn}>Delete column {habit}</button>
    </div>
  );
};

export default ContextMenu;
