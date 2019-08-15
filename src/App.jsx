import React, {useState, useCallback} from 'react';
import './App.css';

import Renderer from './components/Renderer';

const initialData = {
  MyField1: 1,
  MyField2: 'test'
};

const schema = [
  {
    id: 1,
    type: "number",
    range: [{min: 0, max: 5}],
    ref: "MyField1",
    label: 'Numeric Field 1'
  },
  {
    id: 2,
    type: "text",
    ref: "MyField2",
    label: 'Text Field 2'
  },
  {
    id: 3,
    type: "text",
    ref: "MyField3",
    label: 'Text Field 3',
    visible: {">" : [ { "var" : "MyField1" }, 3 ] }
  }
];

function App() {
  const [data, setData] = useState(initialData);

  const OnChange = useCallback((value, ref) => {
    setData({
      ...data,
      [ref]: value
    });

    console.log('Output', data);
  });

  return (
    <div className="App">
      <h2>Dynamic UI Form</h2>
      <Renderer schema={schema} data={data} OnChange={OnChange} />
    </div>
  );
}

export default App;
