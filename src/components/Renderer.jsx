import React from 'react';

import SubSchemaField from './fields/SubSchemaField';

function Renderer(props) {

	var SubComponent = null;

	if(Array.isArray(props.schema)){
		SubComponent = props.schema.map( (subSchema, index) => {
			return <Renderer key={index} schema={subSchema} data={props.data} OnChange={props.OnChange} />;
		});
	}
	else if(typeof props.schema === 'object'){
		SubComponent = <SubSchemaField schema={props.schema} data={props.data} OnChange={props.OnChange} />;
	}

  return (
    <div>
    	{SubComponent}
    </div>
  );
}

export default Renderer;
