import React from 'react';

import SchemaRenderer from '../../SchemaRenderer';

const ObjectField = (props) => {
    return (
        <div style={{border: '1px solid #ccc', padding: '0.5rem'}}>
            <SchemaRenderer schema={props.schema.properties} data={props.data} OnChange={props.OnChange} />
        </div>
    );
};

export default ObjectField;