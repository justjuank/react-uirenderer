import React, { Fragment } from 'react';

import objectPath from 'object-path';

import jsonLogic from 'json-logic-js';

import { GetComponentForType } from '../controls';

function ResolveExpression(expression, data) {
	if (typeof expression === 'object') {
		return jsonLogic.apply(expression, data);
	}

	return expression;
}

/**
 * Default schema field
 * @param {*} props 
 */
const SchemaField = (props) => {

	const { schema, data } = props;

	if (!schema) throw new Error('No schema found in this component.');

	var SubSchema = null;
	var LabelComponent = null;

	const { visible } = schema;

	var visibility = ResolveExpression(visible, data);

	if (visible !== undefined && !visibility) return null;

	if (schema.label) {
		var Label = GetComponentForType('label');
		LabelComponent = <Label>{schema.label}</Label>;
	}

	var value = null;

	if (data) {
		value = objectPath.get(data, schema.ref);
	}

	var SubComponent = null;
	SubComponent = GetComponentForType(schema.type);

	if(!SubComponent){
		SubSchema = <i>Schema type '{schema.type}' not supported</i>;
	}
	else
		SubSchema = <SubComponent {...props} value={value} />;

	return (
		<Fragment>
			{LabelComponent}
			{SubSchema}
		</Fragment>
	);
};

export default SchemaField;