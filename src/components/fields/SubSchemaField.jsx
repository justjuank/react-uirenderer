import React, {Fragment} from 'react';

import jsonLogic from 'json-logic-js';

function GetComponentForType(props){
	switch(props.schema.type){
		case 'text':
			return <input type="text" value={props.value} onChange={(e) => props.OnChange(e.target.value, props.schema.ref)} />;
		case 'number':
			return <input type="number" value={props.value} onChange={(e) => props.OnChange(parseInt(e.target.value), props.schema.ref)} />;
		default:
			return null;
	}
}

function ResolveExpression(expression, data){
	if(typeof expression==='object'){
		return jsonLogic.apply(expression, data);
	}

	return expression;
}

function SubSchemaField(props) {

	const { schema, data } = props;

	if(!schema) throw('No schema found in this component');

	const { visible } = schema;

	var visibility = ResolveExpression(visible, data);

	if(visible!==undefined && !visibility) return null;

	var SubComponent = null;
	var LabelComponent = null;

	if(schema.label){
		LabelComponent = <div><label>{schema.label}</label></div>;
	}

	var value = null;

	if(data){
		value=data[schema.ref];
	}

	SubComponent = <GetComponentForType {...props} value={value}/>;

  return (
    <Fragment>
    	{LabelComponent}
    	{SubComponent}
    </Fragment>
  );
}

export default SubSchemaField;