import React, { useState } from 'react';

function Goals() {
  const [goal, setGoal] = useState(10); // Default goal

  const updateGoal = (e) => {
    setGoal(e.target.value);
  };

  return (
    <div>
      <h2>Daily Goals</h2>
      <input type="number" value={goal} onChange={updateGoal} />
      <p>Today's goal: Complete {goal} tasks.</p>
    </div>
  );
}

export default Goals;
