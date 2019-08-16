import React from 'react';

import immutable from 'object-path-immutable';

import SchemaRenderer from '../../SchemaRenderer';

const ObjectField = (props) => {

    const OnChange = (value, ref) => {
        let newData = immutable.set(props.localData, ref, value);
        
        if(props.OnChange)
            props.OnChange(newData, props.schema.ref);
    };

    return (
        <div style={{border: '1px solid #ccc', padding: '0.5rem'}}>
            <SchemaRenderer schema={props.schema.properties} localData={props.localData} data={props.data} OnChange={OnChange} />
        </div>
    );
};

export default ObjectField;