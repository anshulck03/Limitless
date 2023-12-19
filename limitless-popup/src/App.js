import React, { useState } from 'react';
import DropdownMenu from './components/DropdownMenu';
import FeaturePanel from './components/FeaturePanel';
import './App.css';

function App() {
  const [selectedFeature, setSelectedFeature] = useState('');

  return (
    <div className="app">
      <DropdownMenu onSelect={setSelectedFeature} />
      <FeaturePanel selectedFeature={selectedFeature} />
    </div>
  );
}

export default App;
