import React from 'react';

import objectPath from 'object-path';

import SchemaField from './controls/fields/SchemaField';

/**
 * Renders a collection of schemas or a schema property
 * @param {*} props 
 */
const SchemaRenderer = (props) => {

	var SubComponent = null;

	if (Array.isArray(props.schema)) {
		SubComponent = props.schema.map((subSchema, index) => {
			const localData = objectPath.get(props.data, subSchema.ref);
			return <SchemaRenderer key={index} schema={subSchema} data={localData} fullData={props.fullData} OnChange={props.OnChange} />;
		});
	}
	else if (typeof props.schema === 'object') {
		SubComponent = <SchemaField schema={props.schema} data={props.data} fullData={props.fullData} OnChange={props.OnChange} />;
	}

	return (
		<div>
			{SubComponent}
		</div>
	);
}

export default SchemaRenderer;
