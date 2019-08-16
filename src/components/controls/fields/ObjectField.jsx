import React from 'react';

import objectPath from 'object-path';

import immutable from 'object-path-immutable';

import SchemaRenderer from '../../SchemaRenderer';

const ObjectField = (props) => {

    const OnChange = (value, ref) => {
        //const localData = objectPath.get(props.data, props.schema.ref);
        let newData = immutable.set(props.data, ref, value);
        
        if(props.OnChange)
            props.OnChange(newData, props.schema.ref);
    };

    return (
        <div style={{border: '1px solid #ccc', padding: '0.5rem'}}>
            <SchemaRenderer schema={props.schema.properties} data={props.data} fullData={props.data} OnChange={OnChange} />
        </div>
    );
};

export default ObjectField;