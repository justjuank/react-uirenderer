import React, { Fragment, useCallback } from 'react';

import immutable from 'object-path-immutable';
import jsonLogic from 'json-logic-js';

import { GetComponentForType } from '../controls';

import { useContextValue } from '../../UIRenderer';

/**
 * Resolves a jsonLogic expression against the full data object.
 * @param {*} expression 
 * @param {*} data 
 */
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

	const { schema, localData, data, OnChange } = props;

	if (!schema) throw new Error('No schema found in this component.');
	const { visible, valid } = schema;

	var formValidations = useContextValue();

	let fullPath = props.parentRef ? [props.parentRef, schema.ref].join('.') : schema.ref;

	//Check if this field has any validation errors
	var isValid = !formValidations[fullPath] ? true : formValidations[fullPath];
	
	//Callback when a child component makes a change
	const LocalOnChange = useCallback((value, ref, absoluteRef, childValidations) => {
		let validations = [];

		if(childValidations) validations = [...childValidations];

		let newData = immutable.set(data, ref, value);

		//Check for any validations on this level
		var validity = valid === undefined ? true : ResolveExpression(valid, newData);

		validations.push(validity);
		
		if(OnChange)
			OnChange(value, ref, absoluteRef, validations);
    }, [data, valid, OnChange]);

	//Check for visibility
	var visibility = ResolveExpression(visible, data);
	if (visible !== undefined && !visibility) return null;


	var SubSchema = null;
	var LabelComponent = null;

	//Get the label component
	if (schema.label) {
		var Label = GetComponentForType('label');
		LabelComponent = <Label labelInline={schema.labelInline}>{schema.label}</Label>;
	}

	//Get the sub component
	var SubComponent = null;
	SubComponent = GetComponentForType(schema.type);

	if(!SubComponent){
		SubSchema = <i>Schema type '{schema.type}' not supported</i>;
	}
	else
		SubSchema = <SubComponent {...props} parentRef={fullPath} localData={localData} value={localData} OnChange={LocalOnChange} />;
	
	//Get any errors
	var ErrorComponent = null;	
	if(isValid!==true){
		let errorMessage = typeof isValid === 'string' ? isValid : 'Invalid';
		ErrorComponent = <p style={{color: 'red', margin: 0, fontSize: '0.85rem'}}>{errorMessage}</p>
	}

	return (
		<Fragment>
			{LabelComponent}
			{SubSchema}
			{ErrorComponent}
		</Fragment>
	);
};

export default SchemaField;