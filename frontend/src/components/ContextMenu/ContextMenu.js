import React from 'react';
import "./ContextMenu.css"
const ContextMenu = ({ position, onClose, onSelect, habit, updateData }) => {
  function deleteColumn() {
    onClose()
    fetch("http://localhost:4000/deletehabit", {
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
