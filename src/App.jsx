import React, { useState, useCallback } from 'react';
import './App.css';

import UIRenderer from './components/UIRenderer';

import schema from './schemas/example1.json';

const initialData = {
  MyField1: 1,
  MyField2: 'test'
};

function App() {
  const [data, setData] = useState(initialData);

  const OnChange = useCallback((newData) => {
    setData(newData);
    console.log('Output', newData);
  }, []);

  return (
    <div className="App">
      <h2>Dynamic UI Form</h2>
      <div style={{ float: 'left', width: '50%' }}>
        <UIRenderer schema={schema} data={initialData} OnChange={OnChange} />
      </div>
      <div style={{ float: 'left', width: '45%', padding: '0 1rem' }}>
        <h4>Data Output</h4>
        <pre style={{ border: '1px solid #ccc', padding: '1rem', minHeight: '300px' }}>{JSON.stringify(data, null, 2)}</pre>
      </div>
    </div>
  );
}

export default App;
