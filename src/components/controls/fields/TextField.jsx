import React from 'react';

const TextField = (props) => {
    return <input type="text" value={props.value} onChange={(e) => props.OnChange(e.target.value, props.schema.ref)} />;
};

export default TextField;