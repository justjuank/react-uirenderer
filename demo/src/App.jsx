import React, { useState, useCallback } from 'react';
import './App.css';

import { UIRenderer } from 'react-uirenderer';

import JSONEditor from './demo/JSONEditor';

import schema from './schemas/example1.json';

const initialData = {
  MyField2: 'test',
  MySelect1: 2
};

function App() {
  const [data, setData] = useState(initialData);
  const [valid, setValid] = useState(false);
  const [uiSchema, setUiSchema] = useState(schema);
  const [showDataOutput, setShowDataOutput] = useState(true);
  const [showSchema, setShowSchema] = useState(true);

  const OnChange = useCallback((newData, newValid) => {
    setData(newData);
    setValid(newValid);
    //console.log('Output', newData);
  }, []);

  const OnSchemaModified = useCallback((newSchema) => {
    setUiSchema(newSchema);
  }, []);

  return (
    <div className="App">
      <h2>Dynamic UI Form</h2>
      <p>Form Valid State: <b style={{color: valid===true ? '#0fc10f' : 'red'}}>{valid===true ? 'true' : 'false'}</b></p>
      <div style={{ float: 'left', width: '50%' }}>
        <UIRenderer schema={uiSchema} data={initialData} OnChange={OnChange} />
      </div>
      <div style={{ float: 'left', width: '45%', padding: '0 1rem' }}>
        <h4 style={{cursor: 'pointer'}} onClick={() => setShowDataOutput(!showDataOutput)}>Data Output</h4>
        {(showDataOutput && <pre style={{ border: '1px solid #ccc', padding: '1rem', minHeight: '300px' }}>{JSON.stringify(data, null, 2)}</pre> )}

        <div>
        <h4 style={{cursor: 'pointer'}} onClick={() => setShowSchema(!showSchema)}>UI Schema <small>(Try changing it)</small></h4>
          {(showSchema && <JSONEditor json={uiSchema} OnChange={OnSchemaModified}></JSONEditor> )}
        </div>
      </div>
    </div>
  );
}

export default App;
