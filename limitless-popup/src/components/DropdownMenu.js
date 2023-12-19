import React from 'react';

function DropdownMenu({ onSelect }) {
  return (
    <select onChange={e => onSelect(e.target.value)} className="dropdown-menu">
      <option value="">Select Feature</option>
      <option value="Timer">Timer</option>
      <option value="TimerSettings">Timer Settings</option>
      <option value="Goals">Goals</option>
      <option value="Statistics">Statistics</option>
      <option value="Tasks">Tasks</option>
      <option value="Music">Music</option>
    </select>
  );
}

export default DropdownMenu;
