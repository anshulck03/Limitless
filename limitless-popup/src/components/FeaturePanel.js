import React from 'react';
import Timer from './Timer';
import TimerSettings from './TimerSettings';
import Goals from './Goals';
import Statistics from './Statistics';
import Tasks from './Tasks';
import Music from './Music';

function FeaturePanel({ selectedFeature }) {
  const renderFeature = () => {
    switch (selectedFeature) {
      case 'Timer':
        return <Timer />;
      case 'TimerSettings':
        return <TimerSettings />;
      case 'Goals':
        return <Goals />;
      case 'Statistics':
        return <Statistics />;
      case 'Tasks':
        return <Tasks />;
      case 'Music':
        return <Music />;
      default:
        return <div>Please select a feature from the dropdown menu.</div>;
    }
  };

  return (
    <div className="feature-panel">
      {renderFeature()}
    </div>
  );
}

export default FeaturePanel;
