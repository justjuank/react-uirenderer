import React from 'react';

const NumberField = (props) => {

    const OnChange = (e) => {
        var value = e.target.value.length <= 0 ? null : (parseInt(e.target.value));
        props.OnChange(value, props.schema.ref);
    }

    return <input type="number" value={props.value !== null ? props.value : ''} onChange={OnChange} />;
};

export default NumberField;