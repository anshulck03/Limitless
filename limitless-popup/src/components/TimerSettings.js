import React, { useState } from 'react';

function TimerSettings({ onSave }) {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);

  const saveSettings = () => {
    onSave({
      workMinutes,
      breakMinutes
    });
  };

  return (
    <div>
      <h2>Timer Settings</h2>
      <div>
        <label>
          Work Duration (minutes):
          <input
            type="number"
            value={workMinutes}
            onChange={(e) => setWorkMinutes(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Break Duration (minutes):
          <input
            type="number"
            value={breakMinutes}
            onChange={(e) => setBreakMinutes(e.target.value)}
          />
        </label>
      </div>
      <button onClick={saveSettings}>Save Settings</button>
    </div>
  );
}

export default TimerSettings;
