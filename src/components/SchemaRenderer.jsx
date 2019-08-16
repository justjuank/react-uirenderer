import React from 'react';

import SchemaField from './controls/fields/SchemaField';

function SchemaRenderer(props) {

	var SubComponent = null;

	if (Array.isArray(props.schema)) {
		SubComponent = props.schema.map((subSchema, index) => {
			return <SchemaRenderer key={index} schema={subSchema} data={props.data} OnChange={props.OnChange} />;
		});
	}
	else if (typeof props.schema === 'object') {
		SubComponent = <SchemaField schema={props.schema} data={props.data} OnChange={props.OnChange} />;
	}

	return (
		<div>
			{SubComponent}
		</div>
	);
}

export default SchemaRenderer;
