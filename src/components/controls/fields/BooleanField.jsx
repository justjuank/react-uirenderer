import React from 'react';

const BooleanField = (props) => {
    const { schema } = props;

    const OnChange = (e) => {
        var value = e.target.checked;
        props.OnChange(value, schema.ref, schema.ref);
    }

    return <input type="checkbox" value={props.value} onChange={OnChange} />;
};

export default BooleanField;